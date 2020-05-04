import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Ingredient extends Component {

    render() {
        let descriptionToDisplay = this.props.description.slice(0, 150)
        if (descriptionToDisplay.length < this.props.description.length) {
            descriptionToDisplay += '...';
        }

        return (
            <Card style={{ flex: '0 0 300px' }}>
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
                    <Button variant="primary"><Link to={`/ingredients/${this.props.id}`} className="btn btn-primary">View details</Link></Button>
                </Card.Body>
            </Card>
        );
    }

}

export default Ingredient;