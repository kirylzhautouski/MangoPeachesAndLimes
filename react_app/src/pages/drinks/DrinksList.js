import React, { Component } from 'react';

import InfiniteItems from '../../common/InfiniteItems.js';
import coctailsAPI from '../../api/CoctailsAPI.js';
import { createDrinksCards } from '../../api/mappers.js';

class DrinksList extends Component {

    render() {
        return (
            <InfiniteItems
                portion={20}
                onLoadItems={async (limit, offset) => createDrinksCards(await coctailsAPI.loadDrinks(limit, offset)) } 
            />
        );
    }

}

export default DrinksList;