import React from 'react';
import Components from '@/components';
import { connect } from 'react-redux';
import { increment, decrement, reset } from '@/redux/actions/counter';
import './style.less';
import Common from './common.js';

const { Loading, Button } = Components;

@connect(
    state => ({
        count: state.counter.count
    }),
    dispatch => ({
        increase: () => dispatch(increment()),
        decrease: () => dispatch(decrement()),
        reset: () => dispatch(reset())
    })
)

export default class Test extends Common {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    render() {
        return (
            <div className="normal">
                tests111
                <Loading loading={this.state.loading}/>
                <Button onClick={this.testClick}>Button</Button>
                {this.props.count}
                <Button onClick={this.onIncrease}>increase</Button>
                <Button onClick={this.onDecrease}>decrease</Button>
                <Button onClick={this.onReset}>reset</Button>
            </div>
        );
    }
}
