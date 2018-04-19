import { hot } from 'react-hot-loader';
import * as React from 'react';
import Counter from './components/Counter';


import './styles/theme.sass';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <Counter />
    );
  }
}

export default hot(module)(App);
