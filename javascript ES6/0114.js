// 실습 : set, destructuring을 이용한 로또번호 추출기 

//풀이1.
const SETTING = {
    name: "LUCKY LOTTO!",
    count: 6,
    maxNumber: 45
}

function getRandomNumber(count, maxNumber) {
    let mySet = new Set();
  
    while(mySet.size < count){
      const random = Math.floor(Math.random() * maxNumber);
        mySet.add(random);
    }
    console.log(mySet);
}

let { count, maxNumber } = SETTING;
getRandomNumber(count, maxNumber);


//풀이2.
const SETTING = {
    name: "LUCKY LOTTO!",
    count: 6,
    maxNumber: 45
}

let { count, maxNumber } = SETTING;
let mySet = new Set();

function getRandomNumber(maxNumber) {
    const random = parseInt(Math.floor(Math.random() * maxNumber));
    mySet.add(random);
}

while (mySet.size < count) {
    getRandomNumber(maxNumber);
}
console.log(mySet);