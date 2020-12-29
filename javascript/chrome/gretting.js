const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    todoForm = document.querySelector(".js-toDoForm"),
    list = document.querySelector(".js-toDoList"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    paintGreeting(currentValue);
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    list.style.display = 'none';
    form.addEventListener("submit", handleSubmit);
}


function paintGreeting(text) {
    list.style.display = 'table';
    form.classList.remove(SHOWING_CN);
    todoForm.classList.add(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello! \n ${text}`;
    
    const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if(check.test(`${text}`)) {
        greeting.style.cssText = "font-size: x-large;";
    };
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}

init();