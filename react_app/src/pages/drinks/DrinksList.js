import React, { Component, Fragment } from 'react';

import InfiniteItems from '../../common/InfiniteItems.js';
import DrinksFilters from './DrinksFilters.js';
import coctailsAPI from '../../api/CoctailsAPI.js';
import { createDrinksCards } from '../../api/mappers.js';

class DrinksList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'showAlcoholic': true,
            'showNonAlcoholic': true,
            'ingredients': [],
        };
    }

    updateFilters(name, value) {
        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <Fragment>
                <DrinksFilters 
                    showAlcoholic={this.state.showAlcoholic}
                    showNonAlcoholic={this.state.showNonAlcoholic}
                    ingredients={this.state.ingredients}
                    onFiltersChange={ (name, value) => this.updateFilters(name, value) } 
                />
                
                <InfiniteItems
                    portion={20}
                    searchQuery={this.props.searchQuery}
                    showAlcoholic={this.state.showAlcoholic}
                    showNonAlcoholic={this.state.showNonAlcoholic}
                    ingredients={this.state.ingredients}
                    onLoadItems={async (limit, offset) => createDrinksCards(await coctailsAPI.loadDrinks(limit, offset, this.props.searchQuery, this.state.ingredients, this.state.showAlcoholic, this.state.showNonAlcoholic)) } 
                />
            </Fragment>
        );
    }

}

export default DrinksList;