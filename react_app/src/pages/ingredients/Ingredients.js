import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import IngredientsList from './IngredientsList.js';
import IngredientDetail from './IngredientDetail.js';

class Ingredients extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/ingredients' component={IngredientsList} />
                <Route path='/ingredients/:id' component={IngredientDetail} />
            </Switch>
        );
    }

}

export default Ingredients;