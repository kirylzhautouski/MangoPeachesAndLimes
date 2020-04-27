import React, { Component } from 'react';

class IngredientDetail extends Component {

    render() {
        return (
            <p>Ingredient {this.props.match.params.id}</p>
        );
    }

}

export default IngredientDetail;