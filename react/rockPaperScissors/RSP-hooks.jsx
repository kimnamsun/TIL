import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
    rock: '0',
    scissor: '-260px',
    paper: '-538px',
}

const scores = {
    rock: 0,
    scissor: 1,
    paper: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);
    const [score, setScore] = useState(0);
    const [win, setWin] = useState(0);
    const [lose, setLose] = useState(0);
    const [draw, setDraw] = useState(0);

    const interval = useRef();

    useEffect ( () => { //componentDidMount, componentDidUpdate 역할 (1:1 대응은 아님)
        interval.current = setInterval(changeHand, 100);
        return () => { //componentWillUnmount 역할
            clearInterval(interval.current)
        }
    }, [imgCoord]);

    const changeHand = () => {
        if (imgCoord === rspCoords.rock) { //바위
            setImgCoord(rspCoords.scissor);
        } else if (imgCoord === rspCoords.scissor) { //가위
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper) { //보
            setImgCoord(rspCoords.rock);
        }
    }

    const onClickBtn = (choice) => () => {

        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            setResult('비겼습니다.😑');
            setDraw((prevDraw) => prevDraw + 1);
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다.🥰');
            setScore((prevScore) => prevScore + 1);
            setWin((prevWin) => prevWin+ 1);
        } else {
            setResult('졌습니다.😂');
            setScore((prevScore) => prevScore - 1);
            setLose((prevLose) => prevLose + 1);
        }
        setTimeout( () => {
            interval.current = setInterval(changeHand, 100)
        }, 1000);
    }

    return (
        <>
            <div id="computer" style={{ background: `url('https://images.velog.io/images/nsunny0908/post/0b5dc50a-942b-45f7-9ad2-80d96d404777/16ebf9fceb62fc579.jpeg') ${imgCoord} 0` }}>
            </div>
            <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
            <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
            <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
            <div>{result}</div>
            <div>이긴 횟수 : {win} | 진 횟수 : {lose} | 비긴 횟수 : {draw} </div>
            <div>현재 {score}점</div>
        </>
    );
}

export default RSP;