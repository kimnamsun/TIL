var table = document.querySelector('#table');
var data = [];

function init() {
    var fragment = document.createDocumentFragment();

    [1, 2, 3, 4].forEach(function() {
        var columnData = [];
        data.push(columnData);
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function() {
            columnData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function random() {
    var blankArr = [];
    data.forEach(function(columnData, i){
        columnData.forEach(function(rowData, j){
            if(!rowData) {
                blankArr.push([i, j]);
            }
        });
    });
    var random = blankArr[Math.floor(Math.random() * blankArr.length)];
    data[random[0]][random[1]] = 2;
    console.log(random);
    paint();
}

function paint(){
    data.forEach(function(columnData, i){
        columnData.forEach(function(rowData, j){
            if(rowData > 0) {
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

//드래그시작 변수
var dragStart = false;
var startLocation;
var endLocation;

//마우스누를때
window.addEventListener('mousedown', function(event){
    dragStart = true;
    startLocation = [event.clientX, event.clientY];
});
//마우스움직임
window.addEventListener('mousemove', function(event){
    if(dragStart) {

    }
});

//마우스 뗄 때
window.addEventListener('mouseup', function(event){
    dragStart = false;
    endLocation = [event.clientX, event.clientY];
});