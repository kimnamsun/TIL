var screen = document.querySelector('#screen');
var resultDiv = document.querySelector('#result');
var startDate;
var endDate;
var timeOut;
var score = [];

screen.addEventListener('click', function (e) {

    if (screen.classList.contains('waiting')) { //현재 준비상태인지 파악 aqua
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요.';
        resultDiv.textContent = '';

        timeOut = setTimeout(function () {
            startDate = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000) + 1000); // 2000~3000 사이 랜덤한 숫자

    } else if (screen.classList.contains('ready')) { //준비상태 red

        if (!startDate) { //부정클릭
            clearTimeout(timeOut);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.innerHTML = '너무 성급하시군요😑<br>다시 클릭해주세요.';

        } else {
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = 'click‼';
        }
    } else if (screen.classList.contains('now')) { //시작 상태 greenyellow
        endDate = new Date();
        var result = endDate - startDate;

        resultDiv.textContent = `${result}ms`;

        score.push(result);
        startDate = null;
        endDate = null;
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요!';
    }
});