import React, { Component } from 'react';

import InfiniteItems from '../../common/InfiniteItems.js';
import coctailsAPI from '../../api/CoctailsAPI.js';
import createDrinkCards from '../../api/mappers.js';

class DrinksListPage extends Component {

    render() {
        return (
            <InfiniteItems
                portion={20}
                onLoadItems={async (limit, offset) => createDrinkCards(await coctailsAPI.loadDrinks(limit, offset)) } 
            />
        );
    }

}

export default DrinksListPage;