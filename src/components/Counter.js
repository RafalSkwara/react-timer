import * as React from 'react';
import Button from './Button';

import './Counter.sass';

class Counter extends React.Component {// eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            to: 0, // in seconds
            from: 0,
            isTicking: false,        // flag to see if timer is ticking
            buttonText: 'Start',     // to be passed as prop to Button
        }; // end state
        this.changeNumber = this.changeNumber.bind(this);
        this.clickHandlerButton = this.clickHandlerButton.bind(this);
    }
    // lifecycle methods
    componentWillUpdate() {
        if (Number(this.state.from) === Number(this.state.to)+1) {
        clearInterval(this.timer);
        this.setState({
            buttonText: 'Finished',
            buttonColor: 'white',
        });
        }
    }
    // other methods
    // 1. helper methods

    // format to always have double digits
    format(number) {
        return number < 10 ? `0${number}` : number;
    }

    // convert seconds to minutes and seconds
    secToMin(seconds) {
        return {
            sec: this.format(seconds % 60),
            min: this.format((seconds - (seconds % 60)) / 60),
        };
    }
    // event handler for inputs' onChange
    changeNumber(e) {
        console.log(this.state, Number(this.state.from) === Number(this.state.to))
        clearInterval(this.timer);
        this.setState({
            isTicking: false,
            buttonText: 'Start',
            buttonColor: 'green',
        });
        let num;
        num = e.target.value;
        if (e.target.name === 'from') {
            this.setState({
                from: num,
            });
        } else if (e.target.name === 'to') {
            this.setState({
                to: num,
            });
        }
    }

    clickHandlerButton() {
        if (!this.state.isTicking && +this.state.from > +this.state.to) {
            this.timer = setInterval(() => this.tick(), 1000);
            this.setState({
                isTicking: true,
                buttonText: 'Stop',
                buttonColor: "red",
            });
        } else {
            clearInterval(this.timer);
            this.setState({
                isTicking: false,
                buttonText: 'Start',
                buttonColor: "green",
            });
        }
    }

    tick() {
        this.setState({
            from: this.state.from - 1,
        });
    }

    render() {
        return (
            <div className={"counter"}>
                <p className="timer-to">{this.secToMin(this.state.to).min}:{this.secToMin(this.state.to).sec}</p>
                <p className="timer">{this.secToMin(this.state.from).min}:{this.secToMin(this.state.from).sec}</p>
                <div className={"top"}>
                    < div className = {"column"} >
                        <span>to: </span><input onChange={this.changeNumber} type={"number"} name={"to"}  />
                    </div>
                    < div className = {"column"} >
                        <span>from: </span><input onChange={this.changeNumber} type={"number"} name={"from"} />
                    </div>
                </div>
                    <Button 
                        handler={this.clickHandlerButton} 
                        text={this.state.buttonText}
                        bg={this.state.buttonColor}/>
            </div>
        );
    }
}

export default Counter;