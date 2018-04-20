import * as React from 'react';

import './Button.sass';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button 
                onClick={this.props.handler}
                style={{backgroundColor: this.props.bg}}>
                    {this.props.text}
            </button>
        )
    }
}


export default Button;