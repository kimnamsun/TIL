import React, { Component } from 'react';

class Try extends Component {
    render() {
        return (
            <li>
            {/* 리액트 주석 <Component2 /> */}
                <b>{this.props.value.fruit}</b> - {this.props.value.taste}
            </li>
        )
    }
}

export default Try;