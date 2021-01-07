var rival = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    heroData: [],
    deckData: [],
    fieldData: [],
    selectCard: null,
    selectCardData: null,
};

var my = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    heroData: [],
    deckData: [],
    fieldData: [],
    selectCard: null,
    selectCardData: null,
}

var turn = true;
var turnBtn = document.getElementById('turn-btn');

//덱에서 필드로 
function deckToFeild(data, myTurn) {
    var obj = myTurn ? my : rival;
    var nowCost = Number(obj.cost.textContent);
    if (nowCost < data.cost) {
        return 'end';
    }
    var idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx, 1);
    obj.fieldData.push(data);
    reField(obj);
    reDeck(obj);
    data.field = true;
    obj.cost.textContent = nowCost - data.cost;
}

//필드 다시그리기
function reField(obj) {
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function (data) {
        cardDom(data, obj.field);
    });
}

//덱다시그리기
function reDeck(obj) {
    obj.deck.innerHTML = '';
    obj.deckData.forEach(function (data) {
        cardDom(data, obj.deck);
    });
}
//영웅다시그리기
function reHero(obj) {
    obj.hero.innerHTML = '';
    cardDom(obj.heroData, obj.hero, true);
}

//화면 다시그리기
function rePaint(myDisplay) {
    var obj = myDisplay ? my : rival;
    reField(obj);
    reDeck(obj);
    reHero(obj);
}

//턴액션수행
function turnAction (card, data, myTurn) {
    //턴이 끝난 카드면 아무일도 일어나지 않음.
    var friendly = myTurn ? my : rival;
    var enemy = myTurn ? rival : my;

    if (card.classList.contains('card-turnover')) {
        return;
    }
    //상대 카드이면서, 내 카드가 선택되어 있을때 공격
    var enemyCard = myTurn ? !data.mine : data.mine;

    if(enemyCard && friendly.selectCard) {
        data.hp = data.hp - friendly.selectCardData.att;
        if (data.hp <= 0) { //카드가 죽었을때 데이터에서 지워줌.
            var index = enemy.fieldData.indexOf(data);
            if(index > -1) { //쫄병이 죽었을때 (상대 필드에 올라와있는)
                enemy.fieldData.splice(index, 1);
            } else { //영웅이 죽었을때
                alert('승리하셨습니다! 🥳🎉');
                init();
            }
        }
        rePaint(!myTurn);
        friendly.selectCard.classList.remove('card-selected');
        friendly.selectCard.classList.add('card-turnover');
        friendly.selectCard = null;
        friendly.selectCardData = null;
        return;
    } else if (enemyCard) {
        return;
    }
    if (data.field) { //카드가 필드에 있으면
        // 영웅 부모와 필드카드의 부모가 다르기 때문에 document에서 모든 card를 검색한다.
        // 카드.parentNode.querySelectorAll('.card').forEach(function (card) {
        document.querySelectorAll('.card').forEach(function(card){
            card.classList.remove('card-selected');
        });
        card.classList.add('card-selected');
        friendly.selectCard = card;
        friendly.selectCardData = data;
    } else { //덱이 있으면 
        if (deckToFeild(data, myTurn) !== 'end') {
            myTurn ? myDeckMake(1) : rivalDeckMake(1);
        }
    }
}

//카드 돔연결
function cardDom(data, dom, hero) {
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;

    if (hero) {
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }

    //카드 클릭했을때
    card.addEventListener('click', function () {
        turnAction(card, data, turn);
    });

    dom.appendChild(card);
}

//상대덱 생성
function rivalDeckMake(num) {
    for (var i = 0; i < num; i++) {
        rival.deckData.push(cardFactory());
    }
    reDeck(rival);
}
//내덱 생성
function myDeckMake(num) {
    for (var i = 0; i < num; i++) {
        my.deckData.push(cardFactory(false, true));
    }
    reDeck(my);
}
//상대영웅생성
function rivalHeroMake(num) {
    rival.heroData = cardFactory(true);
    cardDom(rival.heroData, rival.hero, true);
}
//내영웅 생성
function myHeroMake(num) {
    my.heroData = cardFactory(true, true);
    cardDom(my.heroData, my.hero, true);
}

//카드공장
function Card(hero, myCard) {
    if (hero) { //영웅일경우 
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (myCard) {
        this.mine = true;
    }
}
function cardFactory(hero, myCard) {
    return new Card(hero, myCard);
}

//턴넘겼을때
turnBtn.addEventListener('click', function () {
    var obj = turn ? my : rival;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    reField(obj);
    reHero(obj);

    //턴을 넘기는 코드 
    turn = !turn; //true일경우 false, false일 경우 true
    if (turn) {
        my.cost.textContent = 10;
    } else {
        rival.cost.textContent = 10;
    }
});

//초기셋팅
function init() {
    [rival, my].forEach(function (item){
        item.deckData = [];
        item.heroData = [];
        item.fieldData = [];
        item.selectCard = [];
        item.selectCardData = [];
    });
    
    rivalDeckMake(5);
    myDeckMake(5);
    rivalHeroMake();
    myHeroMake();
    rePaint(true);
    rePaint(false);
}

init(); //진입점