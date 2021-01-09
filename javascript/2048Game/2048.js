var table = document.querySelector('#table');
var score = document.querySelector('#score');
var data = [];

//초기화
function init() {
    var fragment = document.createDocumentFragment();

    [1, 2, 3, 4].forEach(function () {
        var columnData = [];
        data.push(columnData);
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function () {
            columnData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

//랜덤함수
function random() {
    var blankArr = [];
    data.forEach(function (columnData, i) {
        columnData.forEach(function (rowData, j) {
            if (!rowData) {
                blankArr.push([i, j]);
            }
        });
    });
    if(blankArr.length === 0) {
        alert(`게임오버: ${score.textContent}점`);
        table.innerHTML = '';
        init();
    } else {
        var random = blankArr[Math.floor(Math.random() * blankArr.length)];
        data[random[0]][random[1]] = 2;
        paint();
    }
}
//그리기함수
function paint() {
    data.forEach(function (columnData, i) {
        columnData.forEach(function (rowData, j) {
            if (rowData > 0) {
                table.children[i].children[j].textContent = rowData;
            } else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

init();
random();
paint();

var dragStart = false;
var startLocation;
var endLocation;
var dragging = false;

//마우스누를때
window.addEventListener('mousedown', function (event) {
    dragStart = true;
    startLocation = [event.clientX, event.clientY];
});
//마우스움직임
window.addEventListener('mousemove', function (event) {
    if (dragStart) {
        dragging = true;
    }
});
//마우스 뗄 때
window.addEventListener('mouseup', function (event) {
    endLocation = [event.clientX, event.clientY];
    if (dragging) {
        dragStart = false;
        var direction;
        var xResult = endLocation[0] - startLocation[0];
        var yResult = endLocation[1] - startLocation[1];

        if (xResult < 0 && Math.abs(xResult) / Math.abs(yResult) > 1) {
            direction = 'left';
        } else if (xResult > 0 && Math.abs(xResult) / Math.abs(yResult) > 1) {
            direction = 'right';
        } else if (yResult > 0 && Math.abs(xResult) / Math.abs(yResult) < 1) {
            direction = 'bottom';
        } else if (yResult < 0 && Math.abs(xResult) / Math.abs(yResult) < 1) {
            direction = 'top';
        }
    }
    dragStart = false;
    dragging = false;

    switch (direction) {
        case 'left':
            var newData = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (columnData, i) {
                columnData.forEach(function (rowData, j) {
                    if (rowData) {
                        //합쳐져야하는 경우
                        if (newData[i][newData[i].length - 1] && newData[i][newData[i].length - 1] === rowData) {
                            newData[i][newData[i].length - 1] *= 2;
                            var nowScore = parseInt(score.textContent, 10);
                            score.textContent = nowScore + newData[i][newData[i].length - 1];
                        }  else {
                            newData[i].push(rowData);
                        }
                    }
                });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach(function (columnData, i) {
                [1, 2, 3, 4].forEach(function (rowData, j) {
                    data[i][j] = newData[i][j] || 0;
                });
            });
            break;
        case 'right':
            var newData = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (columnData, i) {
                columnData.forEach(function (rowData, j) {
                    if (rowData) {
                        if (newData[i][0] && newData[i][0] === rowData) {
                            newData[i][0] *= 2;
                            var nowScore = parseInt(score.textContent, 10);
                            score.textContent = nowScore + newData[i][0];
                        } else {
                            newData[i].unshift(rowData);
                        }
                    }
                });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach(function (columnData, i) {
                [1, 2, 3, 4].forEach(function (rowData, j) {
                    data[i][3 - j] = newData[i][j] || 0;
                });
            });
            break;
        case 'top':
            var newData = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (columnData, i) {
                columnData.forEach(function (rowData, j) {
                    if (rowData) {
                        if(newData[j][newData[j].length - 1] && newData[j][newData[j].length - 1] === rowData) {
                            newData[j][newData[j].length - 1] *= 2;
                            var nowScore = parseInt(score.textContent, 10);
                            score.textContent = nowScore + newData[j][newData[j].length - 1];
                        } else {
                            newData[j].push(rowData);
                        }
                    } 
                });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach(function (rowData, i) {
                [1, 2, 3, 4].forEach(function (columnData, j) {
                    data[j][i] = newData[i][j] || 0;
                });
            });
            break;
        case 'bottom':
            var newData = [
                [],
                [],
                [],
                []
            ];
            data.forEach(function (columnData, i) {
                columnData.forEach(function (rowData, j) {
                    if (rowData) {
                        if (newData[j][0] && newData[j][0] === rowData) {
                            newData[j][0] *= 2;
                            var nowScore = parseInt(score.textContent, 10);
                            score.textContent = nowScore + newData[j][0];
                        } else {
                            newData[j].unshift(rowData);
                        }
                    }
                });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach(function (rowData, i) {
                [1, 2, 3, 4].forEach(function (columnData, j) {
                    data[3 - j][i] = newData[i][j] || 0;
                });
            });
            break;
    }
    random();
    paint();
});