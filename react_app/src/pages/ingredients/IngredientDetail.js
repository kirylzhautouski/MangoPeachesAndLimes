import React, { Component, Fragment } from 'react';
import { Badge } from 'react-bootstrap';
 
import PaginatedCards from '../../common/PaginatedCards.js';

class IngredientDetail extends Component {

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
                    <div className='pl-5 pt-2'>
                        <h5>Drinks with this ingredient:</h5>
                        <PaginatedCards items={} />
                    </div>
            </Fragment>

        );
    }


}

export default IngredientDetail;