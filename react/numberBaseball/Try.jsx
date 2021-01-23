import React, { Component } from 'react';

class Try extends Component {
    render() {
        const {tryInfo} = this.props;
        return (
            <li>
            {/* 리액트 주석 <Component2 /> */}
                {tryInfo.try}
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

export default Try;