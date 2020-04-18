import React, { Component } from 'react';

import InfiniteItems from '../../common/InfiniteItems.js';
import coctailsAPI from '../../api/CoctailsAPI.js';
import { createIngredientsCards } from '../../api/mappers.js';

class IngredientsListPage extends Component {

    render() {
        return (
            <InfiniteItems
                portion={20}
                onLoadItems={async (limit, offset) => createIngredientsCards(await coctailsAPI.loadIngredients(limit, offset)) } 
            />
        );
    }

}

export default IngredientsListPage;