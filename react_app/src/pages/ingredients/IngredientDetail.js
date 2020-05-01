import React, { Component, Fragment } from 'react';
import { Badge } from 'react-bootstrap';
 
class IngredientDetail extends Component {

    render() {
        console.log(this.props.detailInfo);

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
                        <h5 className='mt-4'>Description:</h5>
                        <p className='font-weight-bold' style={{ width: '80%' }}>
                            {this.props.detailInfo.description}
                        </p>
                    </div>
            </Fragment>

        );
    }


}

export default IngredientDetail;