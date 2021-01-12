// 실습 : filter, includes, from을 사용해서 문자열 'e'가 포함된 노드로 구성된 배열을 만들어서 반환하기

function print() {
    const fruits = document.querySelectorAll("li");
    const arr = Array.from(fruits);
    const result = arr.filter(value => value.innerText.includes("e"));
    
    return result;
  }
  
  console.log(print());
  