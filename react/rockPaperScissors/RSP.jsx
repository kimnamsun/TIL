import React, { Component } from 'react';

//클래스의 경우 : constructor -> render -> ref -> componentDidMount -> 
// (setState/props 바뀔때 -> shouldComponentUpdate -> render -> componentDidUpdate )
// 부모가 나를 없앴을 때 -> componentWillUnmount

const rspCoords = {
    rock: '0',
    scissor: '-260px',
    paper: '-538px',
}

const score = {
    rock: 0,
    scissor: 1,
    paper: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
        win: 0,
        lose: 0,
        draw: 0,
    };

    interval;


    componentDidMount() { //컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 함.
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() { //컴포넌트가 제거되기 직전, 비동기 요청 정리 

    }

    changeHand = () => {
        const { imgCoord } = this.state;
            if (imgCoord === rspCoords.rock) { //바위
                this.setState({
                    imgCoord: rspCoords.scissor,
                });
            } else if (imgCoord === rspCoords.scissor) { //가위
                this.setState({
                    imgCoord: rspCoords.paper,
                });

            } else if (imgCoord === rspCoords.paper) { //보
                this.setState({
                    imgCoord: rspCoords.rock,
                });
            }
    }

    onClickBtn = (choice) => () => {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = score[choice];
        const cpuScore = score[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            this.setState( (prevState) => {
                return {
                    result: '비겼습니다.😑',
                    draw: prevState.draw + 1,
                }
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState( (prevState) => {
                return {
                    result: '이겼습니다.🥰',
                    score: prevState.score + 1,
                    win: prevState.win + 1,
                }
            });
        } else {
            this.setState( (prevState) => {
                return {
                    result: '졌습니다.😂',
                    score: prevState.score - 1,
                    lose: prevState.lose + 1,
                }
            });
        }
        setTimeout( () => {
            this.interval = setInterval(this.changeHand, 100)
        }, 1000);
    }

    render() {
        const { result, score, imgCoord, win, lose, draw } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url('https://images.velog.io/images/nsunny0908/post/0b5dc50a-942b-45f7-9ad2-80d96d404777/16ebf9fceb62fc579.jpeg') ${imgCoord} 0` }}>
                </div>
                <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
                <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
                <div>{result}</div>
                <div>이긴 횟수 : {win} | 진 횟수 : {lose} | 비긴 횟수 : {draw} </div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;