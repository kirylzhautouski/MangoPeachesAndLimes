import React, { Component, Fragment } from 'react';
import { Badge } from 'react-bootstrap';
 
import PaginatedCards from '../../common/PaginatedCards.js';
import coctailsAPI from '../../api/CoctailsAPI.js';
import { createDrinksCards } from '../../api/mappers.js';

class IngredientDetail extends Component {

    constructor(props) {
        super(props);

        const ingredientId = this.props.detailInfo.id;

        this.state = {
            'hasResults': false,
        };

        const loadPromise = new Promise(async (resolve, error) => {
            resolve(await coctailsAPI.loadDrinksWithIngredients([ingredientId], 20));
        });

        loadPromise.then((drinks) => {
            this.setState({
                'hasResults': true,
                'drinks': createDrinksCards(drinks),
            })
        });
    }

    render() {
        return (
            <Fragment>
                    <div className='pl-5 pt-5'>
                        <h3>{this.props.detailInfo.name}</h3>
                        {this.props.detailInfo.is_alcoholic &&
                            <Fragment>
                            <Badge variant="danger">Alcoholic</Badge>
                            <br/>
                            </Fragment>
                        }
                        {!this.props.detailInfo.is_alcoholic &&
                        <Fragment>
                            <Badge variant="success">Non Alcoholic</Badge>
                            <br/>
                        </Fragment>
                        }
                        <img className='mt-3' src={this.props.detailInfo.image_url} style={{ width:'280px' }} />
                        {this.props.detailInfo.description &&
                        <Fragment>
                            <h5 className='mt-4'>Description:</h5>
                            <p className='font-weight-bold' style={{ width: '80%' }}>
                                {this.props.detailInfo.description}
                            </p>
                        </Fragment>
                        }
                    </div>
                    {this.state.hasResults &&
                        <div className='pl-5 pt-2'>
                        <h5>Drinks with this ingredient:</h5>
                        <PaginatedCards items={this.state.drinks} />
                    </div>
                    }
            </Fragment>
        );
    }


}

export default IngredientDetail;