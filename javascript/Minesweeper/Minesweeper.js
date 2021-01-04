var tbody = document.querySelector("#table tbody");
var stopFlag = false;
var dataset = [];
var opened = 0;

//데이터모음
var dataDictionary = {
    opend: -1,
    question: -2,
    flag: -3,
    flagBomb: -4,
    questionBomb: -5,
    bomb: 1,
    normal: 0,
}

document.querySelector("#exec").addEventListener("click", function () {
    //내부 초기화
    tbody.innerHTML = '';
    dataset = [];
    stopFlag = false;
    opened = 0;
    document.querySelector('#result').textContent = '';

    var hor = parseInt(document.querySelector("#hor").value);
    var ver = parseInt(document.querySelector("#ver").value);
    var mine = parseInt(document.querySelector("#mine").value);

    //지뢰 위치 뽑기
    var random = Array(hor * ver)
        .fill().map(function (ele, index) {
            return index;
        });

    var suffle = [];
    while (random.length > (hor * ver - mine)) {
        var move = random.splice(Math.floor(Math.random() * random.length), 1)[0];
        suffle.push(move);
    }

    //지뢰테이블 만들기 
    for (var i = 0; i < ver; i++) {
        var arr = [];
        var tr = document.createElement("tr");
        dataset.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(dataDictionary.normal);
            var td = document.createElement("td");

            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                if (stopFlag) {
                    return;
                }
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = parentTr.parentNode;
                var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if (['', '✖'].includes(e.currentTarget.textContent)) {
                    e.currentTarget.textContent = '🚩';
                    e.currentTarget.classList.remove('question');
                    e.currentTarget.classList.add('flag');

                    if (dataset[row][col] === dataDictionary.bomb) {
                        dataset[row][col] = dataDictionary.flagBomb;
                    } else {
                        dataset[row][col] = dataDictionary.flag;
                    }

                } else if (e.currentTarget.textContent === '🚩') {
                    e.currentTarget.textContent = '❔';
                    e.currentTarget.classList.add('question');
                    e.currentTarget.classList.remove('flag');
                    
                    if (dataset[row][col] === dataDictionary.flagBomb) {
                        dataset[row][col] = dataDictionary.questionBomb;
                    } else {
                        dataset[row][col] = dataDictionary.question;
                    }
                    
                } else if (e.currentTarget.textContent === '❔') {
                    e.currentTarget.classList.remove('question');
                    

                    if (dataset[row][col] === dataDictionary.bomb
                        ||dataset[row][col] === dataDictionary.flagBomb 
                        ||dataset[row][col] === dataDictionary.questionBomb
                        ) {
                        e.currentTarget.textContent = '✖';
                        dataset[row][col] = dataDictionary.bomb;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[row][col] = dataDictionary.normal;
                    }
                }
            });

            td.addEventListener('click', function (e) {
                if (stopFlag) {
                    return;
                }
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if ([dataDictionary.opend, dataDictionary.flag, dataDictionary.flagBomb
                    , dataDictionary.questionBomb, dataDictionary.question]
                    .includes(dataset[row][col])) {
                    return;
                }

                //클릭했을때
                e.currentTarget.classList.add('opened');
                opened += 1;

                //지뢰인 경우
                if (dataset[row][col] === dataDictionary.bomb) {
                    e.currentTarget.textContent = '💣';
                    document.querySelector('#result').textContent = '게임오버😂';
                    stopFlag = true;
                } else {
                    //지뢰가 아닌 경우 주변 지뢰 개수 세기 
                    var around = [
                        dataset[row][col - 1], dataset[row][col + 1]
                    ];
                    if (dataset[row - 1]) {
                        around = around.concat(dataset[row - 1][col - 1], dataset[row - 1][col], dataset[row - 1][col + 1]);
                    }
                    if (dataset[row + 1]) {
                        around = around.concat(dataset[row + 1][col - 1], dataset[row + 1][col], dataset[row + 1][col + 1]);
                    }
                    var aroundCnt = around.filter(function (y) {
                        return [dataDictionary.bomb, dataDictionary.flagBomb, dataDictionary.questionBomb].includes(y);
                    }).length;

                    //|| '' : 거짓인 값이 앞에 오면 빈문자열을 넣어준다.
                    //거짓인 값 : false, '', 0, null, undefined, Nan
                    e.currentTarget.textContent = aroundCnt || '';
                    dataset[row][col] = dataDictionary.opend;

                    if (aroundCnt === 0) {
                        //주변 8칸 동시 오픈 (재귀 함수)
                        var aroundRow = [];
                        if (tbody.children[row - 1]) {

                            aroundRow = aroundRow.concat([
                                tbody.children[row - 1].children[col - 1],
                                tbody.children[row - 1].children[col],
                                tbody.children[row - 1].children[col + 1]
                            ]);
                        }

                        aroundRow = aroundRow.concat([
                            tbody.children[row].children[col - 1],
                            tbody.children[row].children[col + 1]
                        ]);

                        if (tbody.children[row + 1]) {

                            aroundRow = aroundRow.concat([
                                tbody.children[row + 1].children[col - 1],
                                tbody.children[row + 1].children[col],
                                tbody.children[row + 1].children[col + 1]
                            ]);
                        }
                        aroundRow.filter((v) => !!v).forEach(function (e) {
                            var parentTr = e.parentNode;
                            var parentTbody = e.parentNode.parentNode;
                            var colInForEach = Array.prototype.indexOf.call(parentTr.children, e);
                            var rowInForEach = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                            if (dataset[rowInForEach][colInForEach] !== dataDictionary.opend) {
                                e.click();
                            }
                        });
                    }
                }
                if (opened === hor * ver - mine) {
                    stopFlag = true;
                    document.querySelector('#result').textContent = '성공🥰';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    //지뢰심기
    for (var k = 0; k < suffle.length; k++) { //60
        var hei = Math.floor(suffle[k] / ver); //7 -> 실제6
        var wid = suffle[k] % ver; //예 0 -> 실제 0
        tbody.children[hei].children[wid].textContent = '✖';
        dataset[hei][wid] = dataDictionary.bomb;
    }
    // console.log(dataset);
});

