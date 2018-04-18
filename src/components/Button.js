import * as React from 'react';

import './Button.sass';

class Button extends React.Component {
    constructor(props) {
        super(props);
        state: {};
    }

    render() {
        return (
            <button onClick={this.props.handler}>Text</button>
        )
    }
}

export default Button;