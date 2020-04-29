import React, { Component } from 'react';

class DrinkDetail extends Component {

    render() {
        return (
            <p>Drink {this.props.detailInfo.name}</p>
        );
    }

}

export default DrinkDetail;