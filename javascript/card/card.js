var width = 4;
var height = 3;
var wrapper = document.querySelector('.wrapper');
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green',
'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var colorCandidate = colors.slice();
var color = [];
var clickFlag = true;
var clickCard = [];
var finishCard = [];
var startDate;


function suffle() {
    for(var i = 0; colorCandidate.length > 0; i++){
        color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}



function cardSetting(width, height) {

    clickFlag = false;

    for(var i = 0; i < width * height; i++){
        
        var card = document.createElement('div');
        card.className = 'card';
        
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        (function(c){
            card.addEventListener('click', function(){
                if(clickFlag && !finishCard.includes(c)){
                    c.classList.toggle('flipped');
                    clickCard.push(c);
                    if(clickCard.length === 2) {

                        //두개의 색이 같을 때
                        if(clickCard[0].querySelector('.card-back').style.backgroundColor
                            == clickCard[1].querySelector('.card-back').style.backgroundColor){

                            finishCard.push(clickCard[0]);
                            finishCard.push(clickCard[1]);
                            clickCard = [];

                            //성공했을때
                            if(finishCard.length === width * height){
                                var endDate = new Date();
                                alert(`축하합니다! 성공! ${(endDate - startDate) / 1000}초 걸렸습니다.`);
                                wrapper.innerHTML = '';
                                colorCandidate = colors.slice();
                                color = [];
                                finishCard = [];
                                suffle();
                                cardSetting(width, height);
                            }

                        } else { //두개의 색이 다를때
                            clickFlag = false;
                            setTimeout(function(){
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(card);

        wrapper.appendChild(card);
    }

    document.querySelectorAll('.card').forEach(function(card, i){
        setTimeout(function(){
            card.classList.add('flipped');
        }, 1000 + 100 * i);
    });

    setTimeout(function(){
        document.querySelectorAll('.card').forEach(function (card, index){
            card.classList.remove('flipped');
        });
        clickFlag = true;
        startDate = new Date();
    }, 3000);
}
suffle();
cardSetting(width, height);