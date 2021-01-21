const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: '리액트',
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        //끝말잇기 로직이 들어가는 부분
        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕🥰',
                word: this.state.value,
                value: '',
            })
        } else {
            this.setState({
                result: '땡😢',
                value: '',
            })
        }
        this.input.focus();
    };

    onChangeInput = (e) => {
        this.setState({ value: e.target.value });
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    };

    render() {
        return (
            <>
                <h3>{this.state.word}</h3>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력!</button>
                </form>
                <h3>{this.state.result}</h3>
            </>
        );
    }
}

module.exports = WordRelay;