import React, { Component } from 'react';

import InfiniteItems from '../../common/InfiniteItems.js';
import coctailsAPI from '../../api/CoctailsAPI.js';
import { createIngredientsCards } from '../../api/mappers.js';

class IngredientsList extends Component {

    render() {
        return (
            <InfiniteItems
                portion={20}
                searchQuery={this.props.searchQuery}
                onLoadItems={async (limit, offset) => createIngredientsCards(await coctailsAPI.loadIngredients(limit, offset, this.props.searchQuery)) } 
            />
        );
    }

}

export default IngredientsList;