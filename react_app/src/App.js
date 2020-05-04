import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Drinks from './pages/drinks/Drinks.js';
import Ingredients from './pages/ingredients/Ingredients.js';
import Header from './common/Header.js';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'searchQuery': '',
		}
	}

	showSearchResults(searchQuery) {
		this.setState({
			'searchQuery': searchQuery,
		});

		console.log(searchQuery);
	}

	render() {
		return (
		  <BrowserRouter>
				<Route path="/" render={(props) => {
					return <Header {...props} onSearch={(searchQuery) => { this.showSearchResults(searchQuery); }} />
				}} />
			  <div className="content">
				<Route path="/drinks" component={Drinks}/>
				<Route path="/ingredients" component={Ingredients}/>
			  </div>
		  </BrowserRouter>
		);
	  }
}

export default App;
