var tetris = document.querySelector('#tetris');
var blockArr = [
    ['red', true, [
        [1, 1],
        [1, 1],
    ]],
    ['blue', true, [
        [0, 2, 0],
        [2, 2, 2],
    ]],
    ['orange', true, [
        [3, 3, 0],
        [0, 3, 3],
    ]],
    ['skyblue', true, [
        [0, 4, 4],
        [4, 4, 0],
    ]],
    ['yellowgreen', true, [
        [5, 5, 5],
        [5, 0, 0],
    ]],
    ['pink', true, [
        [6, 6, 6],
        [6, 0, 0],
    ]],
    ['yellow', true, [
        [7, 7, 7, 7],
    ]],
];

var blockDict = {
    0: ['white', false, []],
    1: ['red', true, [
        [1, 1],
        [1, 1],
    ]],
    2: ['blue', true, [
        [0, 1, 0],
        [1, 1, 1],
    ]],
    3: ['orange', true, [
        [1, 1, 0],
        [0, 1, 1],
    ]],
    4: ['skyblue', true, [
        [0, 1, 1],
        [1, 1, 0],
    ]],
    5: ['yellowgreen', true, [
        [1, 1, 1],
        [1, 0, 0],
    ]],
    6: ['pink', true, [
        [1, 1, 1],
        [1, 0, 0],
    ]],
    7: ['yellow', true, [
        [1, 1, 1, 1],
    ]],
    10: ['red', false, [
    ]],
    20: ['blue', false, [
    ]],
    30: ['orange', false, [
    ]],
    40: ['skyblue', false, [
    ]],
    50: ['yellowgreen', false, [
    ]],
    60: ['pink', false, [
    ]],
    70: ['yellow', false, [
    ]],
}
var tetrisData = [];

//칸만들기 함수
function cellMake() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 20; i++){
        var tr = document.createElement('tr');
        var arr = [];
        tetrisData.push(arr);
        fragment.appendChild(tr);
        for (var j = 0; j < 10; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            arr.push(0);
        }
    }
    tetris.appendChild(fragment);
}

//화면그리기함수
function paint () {
    tetrisData.forEach(function(tr, i) {
        tr.forEach(function(td, j) {
            tetris.children[i].children[j].className = blockDict[td][0];
        });
    });
}

//블록생성함수
function blockMake () {
    var block = blockArr[Math.floor(Math.random() * 7)][2];
    block.forEach(function(tr, i) {
        tr.forEach(function(td, j) {
            tetrisData[i][j + 3] = td;
        });
    });
    paint();
}

window.addEventListener('keydown', function(e) {
    switch (e.code) {
        case 'ArrowRight' : //오른쪽 이동
            break;
        case 'ArrowLeft' : //왼쪽 이동
            break;
        case 'ArrowDown' : //아래쪽 이동
            break;
        defalut:
            break;
    }
});

window.addEventListener('keyup', function(e) {
    switch (e.code) {
        case 'Space' : //한방에 내리기
            break;
        case 'ArrowUp' : //방향 전환
            break;
        defalut:
            break;
    }
});


cellMake();
blockMake();