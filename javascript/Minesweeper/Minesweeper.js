var tbody = document.querySelector("#table tbody");
var dataset = [];
document.querySelector("#exec").addEventListener("click", function () {
    //내부 초기화
    tbody.innerHTML = '';
    var hor = parseInt(document.querySelector("#hor").value);
    var ver = parseInt(document.querySelector("#ver").value);
    var mine = parseInt(document.querySelector("#mine").value);

    //지뢰 위치 뽑기
    var random = Array(hor * ver)
        .fill().map(function (ele, index) {
            return index;
        });

    var suffle = [];
    while (random.length > 80) {
        var move = random.splice(Math.floor(Math.random() * random.length), 1)[0];
        suffle.push(move);
    }

    for (var i = 0; i < ver; i++) {
        var arr = [];
        var tr = document.createElement("tr");
        dataset.push(arr);
        for (var j = 0; j < hor; j++) {
            arr.push(1);
            var td = document.createElement("td");
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = parentTr.parentNode;
                var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if (['', '✖'].includes(e.currentTarget.textContent)) {
                    e.currentTarget.textContent = '🚩';
                } else if (e.currentTarget.textContent === '🚩') {
                    e.currentTarget.textContent = '❔';
                } else if (e.currentTarget.textContent === '❔') {
                    if (dataset[row][col] === 1) {
                        e.currentTarget.textContent = '';
                    } else if (dataset[row][col] === '✖') {
                        e.currentTarget.textContent = '✖';
                    }
                }
            });
            td.addEventListener('click', function (e) {
                //클릭했을때 주변 지뢰 개수
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = parentTr.parentNode;
                var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                //지뢰인 경우
                if (dataset[row][col] === '✖') {
                    e.currentTarget.textContent = '💣';
                } else {
                    var around = [
                        dataset[row][col - 1], dataset[row][col + 1]
                    ];
                    if (dataset[row - 1]) {
                        around = around.concat(dataset[row - 1][col - 1], dataset[row - 1][col], dataset[row - 1][col + 1]);
                    }
                    if (dataset[row + 1]) {
                        around = around.concat(dataset[row + 1][col - 1], dataset[row + 1][col], dataset[row + 1][col + 1]);
                    }
                    e.currentTarget.textContent = around.filter(function (y) {
                        return y === '✖';
                    }).length;
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    //지뢰심기
    for (var k = 0; k < suffle.length; k++) { //60
        var hei = Math.floor(suffle[k] / 10); //7 -> 실제6
        var wid = suffle[k] % 10; //예 0 -> 실제 0
        tbody.children[hei].children[wid].textContent = '✖';
        dataset[hei][wid] = '✖';
    }
    console.log(dataset);
});
