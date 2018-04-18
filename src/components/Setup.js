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

    changeNumber(e) {
        clearInterval(this.timer);
        let num;
        num = Math.round(e.target.value * 59 / 100);
        num = num < 10 ? `0${num}` : num;
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
        this.timer = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({ seconds: this.state.seconds - 1 });
    }

    render() {
        return (
            <div className={"setup"}>  
                <p className="timer">{this.state.minutes}:{this.state.seconds}</p>
                <input onChange={this.changeNumber} type={"range"} name={"minutes"} />
                <input onChange={this.changeNumber} type={"range"} name={"seconds"} />
                <Button handler={this.clickHandlerButton}/>
            </div>
        );
    }
}

export default Setup;