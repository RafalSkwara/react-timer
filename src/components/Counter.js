import * as React from 'react';
import './Counter.sass';


class Counter extends React.Component {// eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return ( 
            <div className={"counter"}>
                <p>Jest {this.state.date.toLocaleTimeString()}</p>
            </div>
        );
    }
}

export default Counter;