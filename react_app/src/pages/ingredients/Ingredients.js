import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import IngredientsList from './IngredientsList.js';
import IngredientDetail from './IngredientDetail.js';
import DetailLoader  from '../../common/DetailLoader.js';

import coctailsAPI from '../../api/CoctailsAPI.js';

class Ingredients extends Component {

    render() {
        const routeProps = {
            'loader': coctailsAPI.loadIngredient.bind(coctailsAPI),
            'displayComponent': IngredientDetail,
        }

        return (
            <Switch>
                <Route exact path='/ingredients' component={IngredientsList} />
                <Route path='/ingredients/:id' render={(props) => {
                    return <DetailLoader {...routeProps} {...props} />
                }} /> />
            </Switch>
        );
    }

}

export default Ingredients;