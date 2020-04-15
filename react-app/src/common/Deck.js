import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';
import Drink from './Drink.js';

class Deck extends Component {

    render() {
        return (
            <CardDeck style={{ width: '80%', margin: 'auto' }} >
                {this.props.cards}
            </CardDeck>
        );
    }

}

export default Deck;