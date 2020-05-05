import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import Deck from './Deck.js';

class InfiniteItems extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            items: [],
            offset: 0,
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

    componentDidUpdate(prevProps) {
        if (this.props.searchQuery !== prevProps.searchQuery ||
                this.props.showAlcoholic !== prevProps.showAlcoholic ||
                this.props.showNonAlcoholic !== prevProps.showNonAlcoholic ||
                this.props.ingredients !== prevProps.ingredients) {
            this.setState({
                error: false,
                hasMore: true,
                isLoading: false,
                items: [],
                offset: 0,
            });
            this.loadItems();
        }
    }

    loadItems() {
        this.setState({ isLoading: true }, async () => {
            const nextItems = await this.props.onLoadItems(this.props.portion, this.state.offset);

            if (nextItems === undefined || nextItems.length === 0) {
                this.setState((state, props) => ({
                    hasMore: false,
                    isLoading: false,
                }));
            } else {
                this.setState((state, props) => ({
                    hasMore: true,
                    isLoading: false,
                    items: [
                        ...state.items,
                        ...nextItems,
                    ],
                    offset: state.offset + nextItems.length,
                }));
            }
        });
    }

    render() {
        const decks = [];
        for (let i = 0; i < this.state.items.length; i += 4) {
            decks.push(<Deck key={i} cards={this.state.items.slice(i, i + 4)} />);
        }

        return (
            <React.Fragment>
                {decks}
            </React.Fragment>
        );
    }

}

export default InfiniteItems;