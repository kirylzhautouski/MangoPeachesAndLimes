import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import DrinksListPage from './pages/drinks_list/DrinksListPage.js';
import IngredientsListPage from './pages/ingredients_list/IngredientsListPage.js';

class App extends Component {
	render() {
		return (
		  <HashRouter>
			<div>
			<Navbar bg="light">
                <Navbar.Brand href="">Mango, Peaches and Limes</Navbar.Brand>
				<Nav className="mr-auto">
					<NavLink exact to="/" className="nav-link">Drinks</NavLink>
					<NavLink to="/ingredients" className="nav-link">Ingredients</NavLink>
				</Nav>
            </Navbar>
			  <div className="content">
				<Route exact path="/" component={DrinksListPage}/>
				<Route path="/ingredients" component={IngredientsListPage}/>
			  </div>
			</div>
		  </HashRouter>
		);
	  }
}

export default App;
