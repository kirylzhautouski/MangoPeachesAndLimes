import React, { Component, Fragment } from 'react';
import { CardDeck, Button } from 'react-bootstrap';

import coctailsAPI from '../api/CoctailsAPI.js';
import { createDrinkCard } from '../api/mappers.js';

export default class RandomDrink extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'hasLoaded': false,
            'drink': null,
        }
    }

    _loadRandomDrink() {
        const loadPromise = new Promise(async (resolve, error) => {
            const drink = await coctailsAPI.loadRandomDrink();
            if (drink) {
                resolve(drink);
            } else {
                error(drink);
            }
        });

        loadPromise.then((drink) => {
            this.setState({
                'hasLoaded': true,
                'drink': drink,
            })
        }).catch((errorObj) => {
            console.log(errorObj);
        });
    }

    componentDidMount() {
        this._loadRandomDrink();
    }

    render() {
        return (
            <Fragment>
                <h3 className="mt-3" style={{ textAlign: "center" }}>You got:</h3>
                <CardDeck className="mt-4" style={{ justifyContent: "center" }}>
                    {this.state.hasLoaded &&
                        createDrinkCard(this.state.drink)
                    }
                </CardDeck>
                <div className="mt-5" style={{ margin: "0 auto", textAlign: "center" }}>
                    <Button variant="danger" onClick={() => this._loadRandomDrink()}>Try again!</Button>
                </div>
            </Fragment>
        );
    }

}