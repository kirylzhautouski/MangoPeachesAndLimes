import React, { Component, Fragment } from 'react';
import { FormControl, ListGroup, Button } from 'react-bootstrap';

import HintsUpdater from '../api/HintsUpdater.js';

class SearchHints extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'searchQuery': '',
            'hasHints': false,
            'hints': [],
        };

        this.hintsUpdater = new HintsUpdater();
    }

    handleChange(event) {
        this.setState({
            'searchQuery': event.target.value, 
        }, () => {
            this.loadHints(this.state.searchQuery);
        });
    }

    loadHints(searchQuery) {
        const loadPromise = this.hintsUpdater.search(searchQuery, this.props.loader);
        loadPromise.then((results) => {
            this.setState({
                'hasHints': true,
                'hints': results,
            });
        }).catch((errorObj) => {
            console.log(errorObj);
        });
    }

    addElement(event) {
        const element = {
            id: event.target.id,
            name: event.target.name,
        }

        this.props.onAddElement(element);
    }

    removeElement(event) {
        const elementId = event.target.id;
        this.props.onRemoveElement(elementId); 
    }

    createHintElements(hints) {
        return hints.map((hint) => {
            return <ListGroup.Item key={hint.id}>{hint.name} <Button variant="primary" id={hint.id} name={hint.name} onClick={(event) => this.addElement(event)}>Add</Button></ListGroup.Item>
        });
    }

    render() {
        return (
            <Fragment>
                <FormControl
                    className="mt-3"
                    placeholder="Search ingredients"
                    value={this.state.searchQuery}
                    style={{ width:"40%" }}
                    onChange={ (event) => this.handleChange(event) }
                />
                {this.state.hasHints &&
                    <ListGroup style={{ width: "40%" }}>
                        {this.createHintElements(this.state.hints)}
                    </ListGroup>
                }
            </Fragment>

        );
    }

}

export default SearchHints;