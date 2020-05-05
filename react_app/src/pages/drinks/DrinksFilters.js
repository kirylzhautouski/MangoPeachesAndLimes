import React, { Component } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';

import SearchHints from '../../common/SearchHints.js';
import Chip from '../../common/Chip.js';
import coctailsAPI from '../../api/CoctailsAPI.js';

class DrinksFilters extends Component {
    constructor(props) {
        super(props);

        this.hintsLoader = coctailsAPI.loadIngredients.bind(coctailsAPI, 5, 0);
    }

    handleChange(event) {
        const filterName = event.target.id;

        this.props.onFiltersChange(filterName, event.target.checked);
    }

    addIngredientFilter(ingredient) {
        const newIngredients = this.props.ingredients.slice();

        const index = newIngredients.findIndex((ingredient_) => ingredient_.id === ingredient.id);
        if (index === -1) {
            newIngredients.push(ingredient);
            this.props.onFiltersChange('ingredients', newIngredients);
        }
    }

    removeIngredientFilter(ingredientId) {
        const newIngredients = this.props.ingredients.slice();
        
        const index = newIngredients.findIndex((ingredient) => ingredient.id === ingredientId);
        if (index > -1) {
            newIngredients.splice(index, 1);
            this.props.onFiltersChange('ingredients', newIngredients);
        }
    }

    render() {
        const ingredientChips = this.props.ingredients.map((ingredient) => {
            console.log(ingredient);
            return <Chip text={ingredient.name} key={ingredient.id} onDeleteItem={() => this.removeIngredientFilter(ingredient.id)} />;
        });

        return (
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Show filters
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form inline>
                                <Form.Group controlId="showAlcoholic" className="mr-3">
                                    <Form.Check type="checkbox" defaultChecked={this.props.showAlcoholic} label="Show alcoholic" onChange={(event) => this.handleChange(event)} />
                                </Form.Group>
                                <br />
                                <Form.Group controlId="showNonAlcoholic">
                                    <Form.Check type="checkbox" defaultChecked={this.props.showNonAlcoholic} label="Show non alcoholic" onChange={(event) => this.handleChange(event)} />
                                </Form.Group>
                            </Form>
                            {ingredientChips}
                            <SearchHints 
                                loader={this.hintsLoader} 
                                onAddElement={(ingredientId) => this.addIngredientFilter(ingredientId)}
                                onRemoveElement={(ingredientId) => this.removeIngredientFilter(ingredientId)}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}

export default DrinksFilters;