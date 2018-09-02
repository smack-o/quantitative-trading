import React from 'react';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingText: this.handleLoadingText(props.loading)
        };
    }

    handleLoadingText = loading => (loading ? 'loading' : 'loaded')

    componentWillReceiveProps(nextProps) {
        this.setState({
            loadingText: this.handleLoadingText(nextProps.loading)
        });
    }
    render() {
        return (
            <div>
                {this.state.loadingText}
            </div>
        );
    }
}
