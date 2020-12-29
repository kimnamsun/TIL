var image = '0';
var rockScissorPaper = {
    rock: '0',
    scissor: '-260px',
    paper: '-538px'
}

// console.log(Object.entries(rockScissorPaper));
function computer(image) {
    return Object.entries(rockScissorPaper).find(function (y) {
        return y[1] === image;
    })[0];
}

var interval;
function intervalMaker() {
    interval = setInterval(() => {
        if (image === rockScissorPaper.rock) {
            image = rockScissorPaper.scissor;
        } else if (image === rockScissorPaper.scissor) {
            image = rockScissorPaper.paper;
        } else {
            image = rockScissorPaper.rock;
        }
        document.querySelector('#computer').style.background =
            'url(https://i2.ruliweb.com/img/19/12/01/16ebf9fceb62fc579.jpeg) ' + image + ' 0';
    }, 200);
}

intervalMaker();

var score = {
    rock: 0,
    scissor: 1,
    paper: -1
}


document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {

        clearInterval(interval);
        
        setTimeout(function(){
            intervalMaker();
        }, 1000);

        var user = this.id;
        var userScore = score[user];
        var computerScore = score[computer(image)];
        var scoreText = document.querySelector("#score > h2");
        var winText = document.querySelector("#win");
        var loseText = document.querySelector("#lose");
        var drawText = document.querySelector("#draw");


        if(userScore - computerScore === 0) {
            scoreText.textContent = '비겼습니다.😑';
            drawText.textContent++;
        } else if([-1, 2].includes(userScore - computerScore)) {
            // score[user] - score[computer(image)] === -1 || score[user] - score[computer(image)] === 2
            scoreText.textContent = '이겼습니다.🥰';
            winText.textContent++;
        } else {
            scoreText.textContent = '졌습니다.😂';
            loseText.textContent++;
        }
    });
});