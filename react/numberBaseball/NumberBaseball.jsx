import React, { PureComponent, createRef } from 'react';
import Try from './Try';

function getNumbers() { //숫자 네개를 겹치지 않고 랜덤하고 뽑는 함수.
    const candidate = [...Array(9).keys()].map((v) => v + 1);
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends PureComponent {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        const { tries, value, answer } = this.state; //비구조화 할당
        e.preventDefault();
        if (value === answer.join('')) {
            this.setState( (prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!' }]
                }
            });
            alert('게임을 다시 시작합니다.');
            this.setState({ //초기화
                value: '',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        } else { //답 틀렸을 경우 
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { //10번이상 실패했을경우
                this.setState({
                    result: `10번 이상 틀려서 게임실패! 답은 ${answer.join(',')}`,
                });
                alert('게임을 다시 시작합니다.');
                this.setState({ //초기화
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else { //기회가 더 있을때
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike++;
                    } else if (answer.includes(answerArray[i])) {
                        ball++;
                    }
                }
                this.setState( (prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
                        value: '',
                    };
                });
                this.inputRef.current.focus();
            }
        }
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    inputRef = createRef();

    render() {
        const { tries, value, result } = this.state; //비구조화 할당
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} minLength={4} maxLength={4} value={value} onChange={this.onChangeInput} />
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
}

export default NumberBaseball; //import NumberBaseball;