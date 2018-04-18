import * as React from 'react';
import Counter from './Counter';
import Button from './Button';

import './Setup.sass';

class Setup extends React.Component {// eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = { 
            minutes: 1,
            seconds: 10,
            isTicking: false
         };
        this.changeNumber = this.changeNumber.bind(this);
        this.clickHandlerButton = this.clickHandlerButton.bind(this);
    }

    componentWillMount() {
        this.setState({
            minutes: "01",
            seconds: "01"
        })
    }
    format(number) {
        return number < 10 ? `0${number}` : number;
    }

    changeNumber(e) {
        clearInterval(this.timer);
        this.setState({isTicking: false});
        let num;
        num = Math.round(e.target.value * 59 / 100);
        num = this.format(num);
        if (e.target.name === 'minutes') {
            this.setState({
                minutes: num
            });
        } else if (e.target.name === 'seconds') {
            this.setState({
                seconds: num
            });
        } else {
            this.setState({
                minutes: 0,
                seconds: 1
            });
        }
    }


    clickHandlerButton() {
        if(!this.state.isTicking){
            this.timer = setInterval(() => this.tick(), 1000);
            this.setState({ isTicking: true });
        } else {
            clearInterval(this.timer);
            this.setState({ isTicking: false });
        }
    }
        

    tick() {
        if (Number(this.state.seconds) >= 1) {
            this.setState({ seconds: this.format(this.state.seconds - 1) });
        } else if ((Number(this.state.seconds) === 0)) {
            this.setState({ 
                seconds: this.format(59),
                minutes: this.format(this.state.minutes - 1)
             });
        }
       
    }

    render() {
        return (
            <div className={"setup"}>  
                <p className="timer">{this.state.minutes}:{this.state.seconds}</p>
                <input onChange={this.changeNumber} type={"range"} name={"minutes"} value={this.state.minutes*100/59} />
                <input onChange={this.changeNumber} type={"range"} name={"seconds"} value={this.state.seconds * 100 / 59}/>
                <Button handler={this.clickHandlerButton}/>
            </div>
        );
    }
}

export default Setup;