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

//덱투필드
function deckToFeild(data, myTurn) {
    var obj = myTurn ? my : rival;
    var nowCost = Number(obj.cost.textContent);
    if (nowCost < data.cost) {
        return 'end';
    }
    var idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx, 1);
    obj.fieldData.push(data);
    obj.deck.innerHTML = '';
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function (data) {
        cardDom(data, obj.field);
    });
    obj.deckData.forEach(function (data) {
        cardDom(data, obj.deck);
    });
    data.field = true;
    obj.cost.textContent = nowCost - data.cost;
}

//화면 다시그리기
function rePaint(myDisplay) {
    var obj = myDisplay ? my : rival;
    obj.deck.innerHTML = '';
    obj.field.innerHTML = '';
    obj.hero.innerHTML = '';
    
    obj.fieldData.forEach(function (data) {
        cardDom(data, obj.field);
    });
    obj.deckData.forEach(function (data) {
        cardDom(data, obj.deck);
    });
    cardDom(obj.heroData, obj.hero, true);
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
        if (turn) { //내 턴일때
            //상대 카드이면서, 내 카드가 선택되어 있고, 또 그게 턴이 끝난 카드가 아닐때 공격
            if(!data.mine && my.selectCard && !card.classList.contains('card-turnover')) { 
                data.hp = data.hp - my.selectCardData.att;
                rePaint(false);
                my.selectCard.classList.remove('card-selected');
                my.selectCard.classList.add('card-turnover');
                my.selectCard = null;
                my.selectCardData = null;
                return;
            } else if (!data.mine) {
                return;
            }
            if (data.field) { //카드가 필드에 있으면
                card.parentNode.querySelectorAll('.card').forEach(function(card){
                    card.classList.remove('card-selected');
                });
                card.classList.add('card-selected');
                my.selectCard = card;
                my.selectCardData = data;
            } else { //덱에 있으면 
                if (deckToFeild(data, true) !== 'end') {
                    myDeckMake(1);
                }
            }
        } else { //상대 턴일때
            //내카드일경우 return
            if (data.mine || data.field) {
                return;
            }
            if (deckToFeild(data, false) !== 'end') {
                rivalDeckMake(1);
            }
        }
    });

    dom.appendChild(card);
}
//라이벌덱 생성
function rivalDeckMake(num) {
    for (var i = 0; i < num; i++) {
        rival.deckData.push(cardFactory());
    }
    rival.deck.innerHTML = '';
    rival.deckData.forEach(function (data) {
        cardDom(data, rival.deck);
    });
}
//내덱 생성
function myDeckMake(num) {
    for (var i = 0; i < num; i++) {
        my.deckData.push(cardFactory(false, true));
    }
    my.deck.innerHTML = '';
    my.deckData.forEach(function (data) {
        cardDom(data, my.deck);
    });
}
//라이벌영웅생성
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

//초기셋팅
function init() {
    rivalDeckMake(5);
    myDeckMake(5);
    rivalHeroMake();
    myHeroMake();
}

turnBtn.addEventListener('click', function () {
    turn = !turn; //true일경우 false, false일 경우 true
    if (turn) {
        my.cost.textContent = 10;
    } else {
        rival.cost.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
});

init();