import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import Drinks from './pages/drinks/Drinks.js';
import Ingredients from './pages/ingredients/Ingredients.js';

class App extends Component {
	render() {
		return (
		  <BrowserRouter>
			<div>
			<Navbar bg="light">
                <Navbar.Brand href="">Mango, Peaches and Limes</Navbar.Brand>
				<Nav className="mr-auto">
					<NavLink to="/drinks" className="nav-link">Drinks</NavLink>
					<NavLink to="/ingredients" className="nav-link">Ingredients</NavLink>
				</Nav>
            </Navbar>
			  <div className="content">
				<Route path="/drinks" component={Drinks}/>
				<Route path="/ingredients" component={Ingredients}/>
			  </div>
			</div>
		  </BrowserRouter>
		);
	  }
}

export default App;
