import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import DrinksList from './DrinksList.js';
import DrinkDetail from './DrinkDetail.js';
import DetailLoader  from '../../common/DetailLoader.js';

import coctailsAPI from '../../api/CoctailsAPI.js';

class Drinks extends Component {

    render() {
        const routeProps = {
            'loader': coctailsAPI.loadDrink.bind(coctailsAPI),
            'displayComponent': DrinkDetail,
        }

        return (
            <Switch>
                <Route exact path='/drinks' render={ (props) => <DrinksList {...props} searchQuery={this.props.searchQuery} />} />
                <Route path='/drinks/:id'  render={(props) => {
                    return <DetailLoader {...routeProps} {...props} />
                }} />
            </Switch>
        );
    }

}

export default Drinks;