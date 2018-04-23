import * as React from 'react';
import PropTypes from 'prop-types';

import './Counter.sass';

class Counter extends React.Component {// eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            to: this.props.countTo,
            from: this.props.countFrom,
            isTicking: true,        // flag to see if timer is ticking
            bgColor: 'rgba(235,235,235,1)',
            percent: 0,
        }; // end state
        this.timer = null;

        this.clickHandler = this.clickHandler.bind(this);
    }
    // lifecycle methods
    componentDidMount() {
        if (this.state.isTicking) {
            console.log(this.state.isTicking);
            this.timer = setInterval(() => {
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
            percent: ((this.state.from-1) / this.props.countFrom) * 100,
            
        });
       
        console.log(this.state.percent);
        if (this.state.from === this.state.to) { 
            this.onSuccess();
        }
    }

    clickHandler() {
        this.btn = document.querySelector('.counter');
        this.btn.classList.contains('unpressed') ? this.btn.classList.remove('unpressed') : this.btn.classList.add('unpressed');
        if (this.state.from === this.state.to) {
            this.state.from = this.props.countFrom;

        }
        if (this.state.isTicking) {
            clearInterval(this.timer);
            this.setState({
                isTicking: false,
                bgColor: '#e50d0d',
            });
        } else {
            this.timer = setInterval(() => {
                this.tick();
            }, 1000);
            this.setState({
                isTicking: true,
                bgColor: '#44af16',
            });
        }
    }

    onSuccess() {
        this.setState({
            isTicking: false,
            bgColor: '#fff316',
        });
        clearInterval(this.timer);
        document.querySelector('.counter').classList.add('unpressed');

    }


    render() {
        return (
            <div className={'counter-wrapper'} >
            <div 
                className={"counter"} 
                    style={{ background: `linear-gradient(to bottom, rgba(235, 235, 235, 1) 0%, rgba(235, 235, 235, 1) ${this.state.percent}%, ${this.state.bgColor} ${this.state.percent}%, ${this.state.bgColor} 100%)` }}
                onClick={this.clickHandler}>
                <p className="timer-to">
                    {this.format(Math.floor(this.state.to / 60))}:
                    {this.format(this.state.to % 60)}</p>
                <p className = "timer" > 
                {this.format(Math.floor(this.state.from / 60))}:
                {this.format(this.state.from % 60)}</p>
            </div>
            </div>
        );
    }
}

Counter.defaultProps = {
    countFrom: 10,
    countTo: 0,
};

Counter.propTypes = {
    countFrom: PropTypes.number,
    countTo: PropTypes.number,
};
export default Counter;