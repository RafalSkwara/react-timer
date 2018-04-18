import { hot } from 'react-hot-loader';
import * as React from 'react';
import Setup from './components/Setup';


import './styles/theme.sass';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <Setup />
    );
  }
}

export default hot(module)(App);
