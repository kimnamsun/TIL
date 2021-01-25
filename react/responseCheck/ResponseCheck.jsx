import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요!',
        result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, result, message } = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });

            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: 'click‼',
                });
                this.startTime = new Date(); //시작시간
            }, Math.floor(Math.random() * 1000) + 2000); //2~3초 랜덤 

        } else if (state === 'ready') { //성급하게 클릭 
            clearTimeout(this.timeout); //타임아웃 제거 
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요😑 다시 클릭해주세요.',
            });

        } else if (state === 'now') { //반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요!',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            });
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        });
    }

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0
            ? null
            : <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={this.onReset}>초기화</button>
            </>
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    <h4>{message}</h4>
                </div>
                    {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;