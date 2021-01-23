import React, { useState, useRef } from 'react';
import Try from './Try-hooks';


//fucntion을 쓰면 class 밖에 있기 때문에 class->hooks로 바꿔도 독립적으로 존재할 수 있다.
function getNumbers() { //숫자 네개를 겹치지 않고 랜덤하고 뽑는 함수.
    const candidate = [...Array(9).keys()].map((v) => v + 1);
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) {
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: '홈런!' }]
            });
            //초기화
            alert('홈런! 게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else { //답 틀렸을 경우 
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { //10번이상 실패했을경우
                //초기화
                alert(`10번 이상 틀려서 게임실패! 답은 ${answer.join(',')}`);
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else { //기회가 더 있을때
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === answer[i]) {
                        strike++;
                    } else if (answer.includes(answerArray[i])) {
                        ball++;
                    }
                }
                setTries((prevTries) => 
                    [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
                );
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        console.log(answer);
        setValue(e.target.value);
    };

    return(
        <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input ref={inputRef} minLength={4} maxLength={4} value={value} onChange={onChangeInput} />
        </form>
        <h3>시도 : {tries.length}</h3>
        <ul>
            {tries.map((v, i) => (
                <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
            ))}
        </ul>
    </>

    );
}

export default NumberBaseball; //import NumberBaseball;