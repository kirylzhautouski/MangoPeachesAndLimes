import React, { Component, Fragment } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import coctailsAPI from '../../api/CoctailsAPI.js';
import { createDrinksCards } from '../../api/mappers.js';
import PaginatedCards from '../../common/PaginatedCards.js';

function Measure(props) {
    const measure = props.measure;

    return (
        <Link to={`/ingredients/${measure.ingredient_id}`} className='list-group-item list-group-item-action'>
            {measure.ingredient_name} - {measure.measure}
        </Link>
    );
}

function MeasureList(props) {
    const measures = props.measures;
    const listItems = measures.map((measure) => {
        return <Measure key={measure.id} measure={measure} />
    });

    return (
        <div className='list-group' style={{ width: '80%' }}>{listItems}</div>
    );
}

class DrinkDetail extends Component {

    constructor(props) {
        super(props);

        const loadPromise = new Promise(async (resolve, error) => {
            const similarDrinks = await coctailsAPI.loadSimilarDrinks(this.props.detailInfo.id);
            if (similarDrinks) {
                resolve(similarDrinks);
            } else {
                error(similarDrinks);
            }
        });

        this.state = {
            'hasResults': false,
        };

        loadPromise.then((similarDrinks) => {


            this.setState({
                'similarDrinkCards': createDrinksCards(similarDrinks),
                'hasResults': true,
            });
        }).catch((errorObject) => {
            this.setState({
                'hasResults': false,
            });
        });
    }

    render() {
        return (
            <Fragment>
                <div className='row pl-5 pt-5'>
                    <div className='col-6'>
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
                        <h5 className='mt-4'>Instructions:</h5>
                        <p className='font-weight-bold'>{this.props.detailInfo.instructions}</p>
                    </div>
                    <div className='col-6'>
                        <h5>Measures:</h5>
                        <MeasureList measures={this.props.detailInfo.measures} />
                    </div>
                </div>
                <div className='pl-5 pt-5' style={{ paddingBottom: '100px' }}>
                    {this.state.hasResults &&
                    <Fragment>
                        <h5>Similar drinks:</h5>
                        <PaginatedCards items={this.state.similarDrinkCards} />
                    </Fragment>
                    }
                </div>
            </Fragment>

        );
    }

}

export default DrinkDetail;