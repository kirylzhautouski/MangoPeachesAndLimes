import React, { Component } from 'react';
import Header from './common/Header.js';
import Drink from './common/Drink.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Drink />
      </React.Fragment>
    );
  }
}

export default App;
