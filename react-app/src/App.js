import React, { Component } from 'react';
import Header from './common/Header.js';
import Deck from './common/Deck.js';
import Drink from './common/Drink.js';

class App extends Component {
  render() {
    const drinkCards = (
      <React.Fragment>
        <Drink />
        <Drink />
        <Drink />
        <Drink />
      </React.Fragment>  
    );

    return (
      <React.Fragment>
        <Header />
        <Deck cards={drinkCards} />
        <Deck cards={drinkCards} />
      </React.Fragment>
    );
  }
}

export default App;
