import React from 'react';

export default class Common extends React.Component {
    testClick = e => {
        console.log(111111);
        this.setState({
            loading: !this.state.loading
        });
    }
    onIncrease = e => {
        this.props.increase();
    }
    onDecrease = e => {
        this.props.decrease();
    }
    onReset = e => {
        this.props.reset();
    }
}
