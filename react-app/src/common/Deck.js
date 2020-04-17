import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';

class Deck extends Component {

    render() {
        return (
            <CardDeck style={{ width: '80%', margin: 'auto', marginTop: '30px' }} >
                {this.props.cards}
            </CardDeck>
        );
    }

}

export default Deck;