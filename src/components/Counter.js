import * as React from 'react';
import Button from './Button';

import './Counter.sass';

class Counter extends React.Component {// eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            to: 0,
            toConverted: {
                min: this.format(0),
                sec: this.format(0)
            }, 
            from: 0,
            fromConverted: {
                min: this.format(0),
                sec: this.format(0)
            },
            isTicking: false,
            buttonText: 'Start',
            bgGrad: () => {return ((this.state.to*60 + this.state.from)/100)}
        }; // end state
        this.changeNumber = this.changeNumber.bind(this);
        this.clickHandlerButton = this.clickHandlerButton.bind(this);
    }
    // lifecycle methods

    // other methods
    format(number) {
        return number < 10 ? `0${number}` : number;
    }

    secToMin(seconds) {
        return {
            sec: this.format(seconds % 60),
            min: this.format((seconds - (seconds % 60)) / 60)
        }
    }

    changeNumber(e) {
        clearInterval(this.timer);
        this.setState({isTicking: false});
        let num;
        num = e.target.value;
        if (e.target.name === 'from') {
            this.setState({
                from: num,
                fromConverted: {
                    sec: this.secToMin(num).sec,
                    min: this.secToMin(num).min
                }
            });
        } else if (e.target.name === 'to') {
            this.setState({
                to: num,
                toConverted: {
                    sec: this.secToMin(num).sec,
                    min: this.secToMin(num).min
                }
            });

        } else {
            this.setState({
                to: 0,
                from: 0
            });
        }
    }

    clickHandlerButton() {
        if (!this.state.isTicking && this.state.from > this.state.to) {
            this.timer = setInterval(() => this.tick(), 1000);
            this.setState({
                isTicking: true,
                buttonText: 'Stop'
            });
        } else {
            clearInterval(this.timer);
            this.setState({ 
                isTicking: false,
                buttonText: 'Start'
            });
        }
    }
        

    tick() {
        if (Number(this.state.from) === Number(this.state.to)-1) {
            clearInterval(this.timer);
        } else {
			this.setState({
				from: this.state.from - 1,
				fromConverted: {
                    sec: this.secToMin(this.state.from).sec,
                    min: this.secToMin(this.state.from).min
				}
			});
		}
    }

    render() {
        return (
            <div className={"setup"}>
            <p className="timer-to">{this.state.toConverted.min}:{this.state.toConverted.sec}</p>
            
                <p className="timer" style={{ backgroundImage: `linear-gradient(to right, red 0%, red ${this.state.bgGrad}%, white ${this.state.bgGrad}%, white 100%)` }}>{this.state.fromConverted.min}:{this.state.fromConverted.sec}</p>
                <div className={"top"}>  
                    <input onChange={this.changeNumber} type={"range"} name={"to"} max={"300"} step="1" value={this.state.to} />
                    <input onChange={this.changeNumber} type={"range"} max={"300"} step={"1"} name={"from"} value={this.state.from}/>
                </div>
                    <Button handler={this.clickHandlerButton} text={this.state.buttonText}/>
            </div>
        );
    }
}

export default Counter;