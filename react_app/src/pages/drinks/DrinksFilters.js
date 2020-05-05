import React, { Component } from 'react';
import { Accordion, Card, Button, Form } from 'react-bootstrap';

class DrinksFilters extends Component {
    handleChange(event) {
        const filterName = event.target.id;

        this.props.onFiltersChange(filterName, event.target.checked);
    }

    render() {
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
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}

export default DrinksFilters;