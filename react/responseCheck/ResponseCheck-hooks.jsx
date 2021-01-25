import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요!');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.')
            
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('click‼')
                startTime.current = new Date(); //시작시간
            }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤 
            
        } else if (state === 'ready') { //성급하게 클릭 
            clearTimeout(timeout.current); //타임아웃 제거 
            setState('waiting');
            setMessage('너무 성급하시군요😑 다시 클릭해주세요.')
            
        } else if (state === 'now') { //반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요!');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>초기화</button>
            </>
    }

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                <h4>{message}</h4>
            </div>
            {renderAverage()}
        </>

    );
}

export default ResponseCheck;