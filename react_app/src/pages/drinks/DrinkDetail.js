import React, { Component } from 'react';

class DrinkDetail extends Component {

    render() {
        return (
            <p>Drink {this.props.match.params.id}</p>
        );
    }

}

export default DrinkDetail;