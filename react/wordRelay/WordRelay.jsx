const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('리액트');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        //끝말잇기 로직이 들어가는 부분
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕🥰');
            setWord(value);
            setValue('');
        } else {
            setResult('땡😢');
            setValue('');
        }
        inputRef.current.focus();
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h3>{word}</h3>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">✏️</label>
                <input id="wordInput" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput} />
                <button>입력!</button>
            </form>
            <h3>{result}</h3>
        </>
    );
};

module.exports = WordRelay;