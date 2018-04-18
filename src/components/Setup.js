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
    }

    componentWillMount() {
        this.setState({
            minutes: "01",
            seconds: "01"
        })
    }

    changeNumber(e) {
        let num;
        num = Math.round(e.target.value * 59 / 100);
        num = num < 10 ? "0" + num : num;
        if (e.target.name === "minutes") {         
            this.setState({
                minutes: num
            });
        } else if (e.target.name === "seconds"){
            this.setState({
                seconds: num
            });
        } else {
            this.setState({
                minutes: 1,
                seconds: 1
            });
        }
    }

    clickHandlerButton() {
        this.timer = setInterval( 
            () => {
                let seconds = this.state.seconds;
                this.setState({
                    seconds: seconds-1
                });
            },
        1000
        );
    }

    render() {
        return (
            <div className={"setup"}>  
                <p>{this.state.minutes}:{this.state.seconds}</p>
                <input onChange={this.changeNumber} type={"range"} name={"minutes"} />
                <input onChange={this.changeNumber} type={"range"} name={"seconds"} />
                <Counter />
                <Button onClick={this.clickHandlerButton}/>
            </div>
        );
    }
}

export default Setup;