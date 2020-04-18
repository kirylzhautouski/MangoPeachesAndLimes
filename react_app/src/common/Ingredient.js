import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

class Ingredient extends Component {

    render() {
        let descriptionToDisplay = this.props.description.slice(0, 150)
        if (descriptionToDisplay.length < this.props.description.length) {
            descriptionToDisplay += '...';
        }

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.ingredientImage} />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    {this.props.isAlcoholic &&
                        <Badge variant="danger">Alcoholic</Badge>
                    }
                    {!this.props.isAlcoholic &&
                        <Badge variant="success">Non Alcoholic</Badge>
                    }
                    <Card.Text>
                        {descriptionToDisplay}
                    </Card.Text>
                    <Button variant="primary">View details</Button>
                </Card.Body>
            </Card>
        );
    }

}

export default Ingredient;