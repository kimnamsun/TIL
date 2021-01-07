var rivalHero = document.getElementById('rival-hero');
var myHero = document.getElementById('my-hero');
var rivalDeck = document.getElementById('rival-deck');
var myDeck = document.getElementById('my-deck');
var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;

//카드 돔연결
function cardDom (data, dom, hero) {
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
    dom.appendChild(card);
}
//라이벌덱 생성
function rivalDeckMake(num) {
    for (var i = 0; i < num; i++) {
        rivalDeckData.push(cardFactory());
    }
    rivalDeckData.forEach(function (data) {
        cardDom(data, rivalDeck);
    });
}
//내덱 생성
function myDeckMake(num) {
    for (var i = 0; i < num; i++) {
        myDeckData.push(cardFactory());
    }
    myDeckData.forEach(function (data) {
        cardDom(data, myDeck);
    });
}
//라이벌영웅생성
function rivalHeroMake(num) {
    rivalHeroData = cardFactory(true);
    cardDom(rivalHeroData, rivalHero, true);
}
//내영웅 생성
function myHeroMake(num) {
    myHeroData = cardFactory(true);
    cardDom(myHeroData, myHero, true);
}

//카드공장
function Card(hero) {
    if (hero) { //영웅일경우 
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
}
function cardFactory(hero) {
    return new Card(hero);
}

//초기셋팅
function init() {
    rivalDeckMake(5);
    myDeckMake(5);
    rivalHeroMake();
    myHeroMake();
}

init();