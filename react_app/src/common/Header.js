import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { matchPath, NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'searchQuery': '',
        }
    }

    updateSearchQuery(searchQuery) {
        this.setState({
            'searchQuery': searchQuery,
        });
    }

    applySearch() {
        this.props.onSearch(this.state.searchQuery);
    }

    emptySearch() {
        this.setState({
            'searchQuery': '',
        }, () => {
            this.applySearch();
        });
    }

    render() {
        const listPageMatch = matchPath(this.props.location.pathname, '/drinks') || 
                                matchPath(this.props.location.pathname, '/ingredients');

        return (
            <Navbar bg="light">
                <Navbar.Brand href="">Mango, Peaches and Limes</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink to="/drinks" className="nav-link" onClick={() => this.emptySearch()}>Drinks</NavLink>
                    <NavLink to="/ingredients" className="nav-link" onClick={() => this.emptySearch()}>Ingredients</NavLink>
                    <NavLink to="/pour-me" className="nav-link">Pour me!</NavLink>
                </Nav>
                {listPageMatch !== null && listPageMatch.isExact &&
                <Form inline>
                    <FormControl type="text" placeholder="Search" value={this.state.searchQuery} name="search" className="mr-sm-2" onChange={(event) => this.updateSearchQuery(event.target.value) } />
                    <Button variant="outline-success" onClick={() => this.applySearch() }>
                            Search
                    </Button>
                </Form>
                }
            </Navbar>
        );
    }

}

export default Header;