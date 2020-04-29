import React, { Component } from 'react';

import coctailsAPI from '../../api/CoctailsAPI.js';

class IngredientDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'hasResult': false,
        }

        const loadPromise = new Promise(async (resolve, error) => {
            const ingredientInfo = await coctailsAPI.loadIngredient(this.props.match.params.id);
            if (ingredientInfo === null) {
                error(ingredientInfo);
            } else {
                resolve(ingredientInfo);
            }
        });

        loadPromise.then((ingredientInfo) => {
            this.setState({
                'hasResult': true,
                'ingredientInfo': ingredientInfo,
            })
        }).catch((reason) => {
            this.setState({
                'hasResult': false,
            })
        });
    }

    render() {
        if (!this.state.hasResult) {
            return <p>404 Not Found</p>
        }

        return (
            <p>Ingredient {this.state.ingredientInfo.name}</p>
        );
    }


}

export default IngredientDetail;