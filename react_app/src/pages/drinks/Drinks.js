import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import DrinksList from './DrinksList.js';
import DrinkDetail from './DrinkDetail.js';

class Drinks extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/drinks' component={DrinksList} />
                <Route path='/drinks/:id' component={DrinkDetail} />
            </Switch>
        );
    }

}

export default Drinks;