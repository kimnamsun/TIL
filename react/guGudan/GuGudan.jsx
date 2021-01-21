const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {

            //옛날 result를 사용하는 경우 함수로 간단하게 표현할 수 있따.
            setResult((prevResult) => {
                return `${value} 정답🥰`;
            });
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');

        } else {
            setValue('');
            setResult('땡😢');
        }
        inputRef.current.focus();
    };

    return (
        <>
            <h3>{first} ✖ {second} = ❓</h3>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type="number" value={value} onChange={onChangeInput} />
                <button>입력!</button>
            </form>
            <h3>{result}</h3>
        </>
    );
}

module.exports = GuGuDan;