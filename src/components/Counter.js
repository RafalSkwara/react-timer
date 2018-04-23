import * as React from 'react';

import './Counter.sass';

class Counter extends React.Component {// eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            to: this.props.countTo,
            from: this.props.countFrom,
            isTicking: true,        // flag to see if timer is ticking
            bgColor: 'green',
        }; // end state
        this.timer = null;

        this.clickHandler = this.clickHandler.bind(this);
    }
    // lifecycle methods
    componentDidMount() {
        if (this.state.isTicking) {
            console.log(this.state.isTicking);
            this.timer = setInterval( () => {
                this.tick();
            }, 1000);
        }
    }
    // other methods
    // 1. helper methods

    // format to always have double digits
    format(number) {
        return number < 10 ? `0${number}` : number;
    }


    tick() {
        this.setState({
            from: this.state.from - 1,
        });
        if (this.state.from === this.state.to) {
            this.onSuccess();
        }
    }

    clickHandler() {
        console.log(this.state.isTicking);
        if (this.state.from === this.state.to) {
            this.state.from = this.props.countFrom;
        }
        if (this.state.isTicking) {
            clearInterval(this.timer);
            this.setState({
                isTicking: false,
                bgColor: 'red',
            });
        } else {
            this.timer = setInterval(() => {
                this.tick();
            }, 1000);
            this.setState({
                isTicking: true,
                bgColor: 'green'
            });
        }
    }

    onSuccess() {
        this.setState({
            isTicking: false,
            bgColor: '#fff316',
        });
        clearInterval(this.timer);

    }

    render() {
        return (
            <div className={"counter"} style={{backgroundColor: this.state.bgColor}} onClick={this.clickHandler}>
                <p className="timer-to">{this.format(Math.floor(this.state.to / 60))}:{this.format(this.state.to % 60)}</p>
                <p className = "timer" > {this.format(Math.floor(this.state.from / 60))}:{this.format(this.state.from % 60)}</p>
            </div>
        );
    }
}

export default Counter;