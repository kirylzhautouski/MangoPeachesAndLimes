import React, { Component } from 'react';

class DetailLoader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            'hasResult': false,
        }


    }

    _loadDetail() {
        const loadPromise = new Promise(async (resolve, error) => {
            const detailInfo = await this.props.loader(this.props.match.params.id);
            if (detailInfo === null) {
                error(detailInfo);
            } else {
                resolve(detailInfo);
            }
        });

        loadPromise.then((detailInfo) => {
            this.setState({
                'hasResult': true,
                'detailInfo': detailInfo,
            })
        }).catch((reason) => {
            this.setState({
                'hasResult': false,
            })
        });
    }

    componentDidMount() {
        this._loadDetail();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this._loadDetail();
        }
    }

    render() {
        if (!this.state.hasResult) {
            return <p>404 Not Found</p>
        }

        return (
            <this.props.displayComponent detailInfo={this.state.detailInfo}/>
        );
    }

}

export default DetailLoader;