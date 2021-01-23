import React, { Component } from 'react';
import Try from './Try';

function getNumbers() { //숫자 네개를 겹치지 않고 랜덤하고 뽑는 함수.

}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state.value);
    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    fruits = [
        {fruit: 'apple', taste: 'good'},
        {fruit: 'orange', taste: 'sweet-and-sour'},
        {fruit: 'grapes', taste: 'sour'},
        {fruit: 'strawberry', taste: 'sweet'},
        {fruit: 'watermelon', taste: 'cool'},
    ]

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <h3>시도 : {this.state.tries.length}</h3>
                <ul>
                    {this.fruits.map( (v, i) =>  (
                        <Try key={v.fruit + v.taste} value={v} index={i}/>
                    ))}
                </ul>
            </>
        );
    }
}

export const hello = 'hello'; //import {hello}
export const bye = 'bye'; // import {hello, bye}

export default NumberBaseball; //import NumberBaseball;