import React, { Component, Fragment } from 'react';

import InfiniteItems from '../../common/InfiniteItems.js';
import coctailsAPI from '../../api/CoctailsAPI.js';
import { createDrinksCards } from '../../api/mappers.js';

class DrinksList extends Component {

    render() {
        return (
            <InfiniteItems
                portion={20}
                searchQuery={this.props.searchQuery}
                onLoadItems={async (limit, offset) => createDrinksCards(await coctailsAPI.loadDrinks(limit, offset, this.props.searchQuery)) } 
            />
        );
    }

}

export default DrinksList;