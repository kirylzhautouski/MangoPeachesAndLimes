import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

class Drink extends Component {

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.drinkImage} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    {this.props.isAlcoholic &&
                        <Badge variant="danger">Alcoholic</Badge>
                    }
                    {!this.props.isAlcoholic &&
                        <Badge variant="success">Non Alcoholic</Badge>
                    }
                    <Card.Text>
                        {this.props.ingredientNames.join(', ')}
                    </Card.Text>
                    <Button variant="primary">View details</Button>
                </Card.Body>
            </Card>
        );
    }

}

export default Drink;