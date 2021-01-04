var body = document.body;
var table = document.createElement('table');
var rows = [];
var cols = [];
var turn = '✖';
var result = document.createElement('div');
result.id = 'result';


function resultCheck(rowPr, colPr) {

    var full = false;

    //가로줄 검사
    if (
        cols[rowPr][0].textContent === turn &&
        cols[rowPr][1].textContent === turn &&
        cols[rowPr][2].textContent === turn
    ) {
        full = true;
    }

    //세로줄 검사
    if (
        cols[0][colPr].textContent === turn &&
        cols[1][colPr].textContent === turn &&
        cols[2][colPr].textContent === turn
    ) {
        full = true;
    }

    //대각선 검사
    if (
        cols[0][0].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][2].textContent === turn
    ) {
        full = true;
    }
    if (
        cols[0][2].textContent === turn &&
        cols[1][1].textContent === turn &&
        cols[2][0].textContent === turn
    ) {
        full = true;
    }
    return full;
}

function reset(draw) {

    if (draw) {
        result.textContent = '무승부 🙄';
    } else {
        result.textContent = `${turn === '✖' ? 'USER' : '컴퓨터'} 승리!`;
    }

    setTimeout(function () {
        result.textContent = '';
        cols.forEach(function (row) {
            row.forEach(function (col) {
                col.textContent = '';
            });
        });
        turn = '✖';
    }, 1000);
}

var callback = function (e) {

    if (turn === '⭕') { //컴퓨터의 턴일때 사용자가 클릭하지 않도록 
        return;
    };

    var rowPr = rows.indexOf(e.target.parentNode);
    var colPr = cols[rowPr].indexOf(e.target);

    if (cols[rowPr][colPr].textContent !== '') {
    } else {
        cols[rowPr][colPr].textContent = turn;

        var full = resultCheck(rowPr, colPr);
        //모든 칸이 다 찼는지 검사
        var otherCol = [];
        cols.forEach(function (row) {
            row.forEach(function (col) {
                otherCol.push(col);
            });
        });

        otherCol = otherCol.filter(function (col) {
            return !col.textContent;
        });

        //다찼으면
        if (full) {
            reset(false); //그냥 비워도 됨.
        } else if (otherCol.length === 0) { //무승부일때
            reset(true);

        } else { //다 안찼으면
            if (turn === '✖') {
                turn = '⭕';
            }

            //컴퓨터 턴
            setTimeout(function () {
                //빈칸 중 하나를 고른다.

                var selectCol = otherCol[Math.floor(Math.random() * otherCol.length)];
                selectCol.textContent = turn;

                //컴퓨터가 승리했는지 체크
                var rowPr = rows.indexOf(selectCol.parentNode);
                var colPr = cols[rowPr].indexOf(selectCol);
                var full = resultCheck(rowPr, colPr);

                //다찼으면
                if (full) {
                    reset(false);
                }
                //턴을 사용자에게 넘긴다.
                turn = '✖';
            }, 500);
        }
    }
};


for (var i = 1; i <= 3; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    cols.push([]);

    for (var j = 1; j <= 3; j++) {
        var col = document.createElement('td');
        col.addEventListener('click', callback);
        cols[i - 1].push(col);
        row.appendChild(col);
    }
    table.appendChild(row);
}

body.appendChild(table);
body.appendChild(result);
