import React, { Component } from 'react';

import coctailsAPI from '../../api/CoctailsAPI.js';

class IngredientDetail extends Component {

    render() {
        return (
            <p>Ingredient {this.props.detailInfo.name}</p>
        );
    }


}

export default IngredientDetail;