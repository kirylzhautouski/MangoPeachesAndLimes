import React, { Component } from 'react';

import coctailsAPI from '../../api/CoctailsAPI.js';

class DrinkDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'hasResult': false,
        }

        const loadPromise = new Promise(async (resolve, error) => {
            const drinkInfo = await coctailsAPI.loadDrink(this.props.match.params.id);
            if (drinkInfo === null) {
                error(drinkInfo);
            } else {
                resolve(drinkInfo);
            }
        });

        loadPromise.then((drinkInfo) => {
            this.setState({
                'hasResult': true,
                'drinkInfo': drinkInfo,
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
            <p>Drink {this.state.drinkInfo.name}</p>
        );
    }

}

export default DrinkDetail;