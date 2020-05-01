import React, { Component, Fragment } from 'react';
import { Pagination } from 'react-bootstrap';

import Deck from './Deck.js';

class PaginatedCards extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'currentPage': 1,
        }
    }

    render() {
        const items = this.props.items;

        const currentPage = this.state.currentPage;

        const pagesCount = items.length / 4;
        const pages = [];
        for (let i = 0; i < pagesCount; i++) {
            pages.push(
                <Pagination.Item className='pt-3' key={i} active={i + 1 === currentPage} onClick={ () => this.setState({
                    'currentPage': i + 1,
                }) }>
                    {i + 1}
                </Pagination.Item>
            );
        }

        return (
                <div style={{ height: '600px' }}>
                    <Deck cards={items.slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)} />
                    <Pagination style={{ justifyContent: 'center' }}>
                        {pages}
                    </Pagination>
                </div>
        );
    }

}

export default PaginatedCards;