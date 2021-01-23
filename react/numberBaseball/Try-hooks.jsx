import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
    return (
        <li>
            {tryInfo.try}
            <div>➡ {tryInfo.result}</div>
        </li>
    )
});

export default Try;