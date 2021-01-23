import React from 'react';

const Try = ({ tryInfo }) => {
    return (
        <li>
            {tryInfo.try}
            <div>➡ {tryInfo.result}</div>
        </li>
    )
};

export default Try;