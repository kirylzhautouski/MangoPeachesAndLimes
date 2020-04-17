import React, { Component } from 'react';

import Header from './common/Header.js';
import InfiniteItems from './common/InfiniteItems';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <InfiniteItems />
      </React.Fragment>
    );
  }
}

export default App;
