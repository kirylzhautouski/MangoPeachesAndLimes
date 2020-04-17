import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import Deck from './Deck.js';
import Drink from './Drink.js';

class InfiniteItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            items: [],
        };

        window.onscroll = debounce(() => {
            const {
                state: {
                    error,
                    isLoading,
                    hasMore,
                }
            } = this;

            if (error || isLoading || !hasMore) return;

            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                this.loadItems();
            }
        }, 100);
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems() {
        this.setState({ isLoading: true }, async () => {
            
            await new Promise(r => setTimeout(r, 2000));
            const nextItems = [
                <Drink />,
                <Drink />,
                <Drink />,
                <Drink />,
                <Drink />,
                <Drink />,
                <Drink />,
                <Drink />,
            ];

            this.setState((state, props) => ({
                hasMore: true,
                isLoading: false,
                items: [
                    ...state.items,
                    ...nextItems,
                ],
            }));
        });
    }

    render() {
        const decks = [];
        for (let i = 0; i < this.state.items.length; i += 4) {
            decks.push(<Deck cards={this.state.items.slice(i, i + 4)} />);
        }

        return (
            <React.Fragment>
                {decks}
            </React.Fragment>
        );
    }

}

export default InfiniteItems;