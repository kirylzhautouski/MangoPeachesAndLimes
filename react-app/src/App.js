import React, { Component } from 'react';

import Header from './common/Header.js';
import InfiniteItems from './common/InfiniteItems';
import coctailsAPI from './api/CoctailsAPI.js';
import createDrinkCards from './api/utils.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <InfiniteItems
          portion={20}
          onLoadItems={async (limit, offset) => createDrinkCards(await coctailsAPI.loadDrinks(limit, offset)) } 
        />
      </React.Fragment>
    );
  }
}

export default App;
