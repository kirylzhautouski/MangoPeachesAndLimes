import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

import drinkImage from '../../public/media/drink_image.jpg';

class Drink extends Component {

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={drinkImage} />
                <Card.Body>
                    <Card.Title>Coctail name</Card.Title>
                    <Badge variant="danger">Alcoholic</Badge>
                    <Card.Text>
                    Ingredient 1, ingredient 2, ingredient 3, ingredient 4
                    </Card.Text>
                    <Button variant="primary">View details</Button>
                </Card.Body>
            </Card>
        );
    }

}

export default Drink;