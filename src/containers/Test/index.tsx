import * as React from 'react';
import { Loading, Button } from '@/components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '@/redux/reducers';
import { TodoActions } from '@/redux/actions';
const { increment, decrement, reset } = TodoActions;
import './style.less';

@connect(
    (state: RootState) => ({
        count: state.counter.count
    }),
    (dispatch: Dispatch<RootState>) => ({
        increase: () => dispatch(increment()),
        decrease: () => dispatch(decrement()),
        reset: () => dispatch(reset())
    })
)

export class Test extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false
        };
    }
    testClick = (e: any) => {
        this.setState({
            loading: !this.state.loading
        });
    }
    onIncrease = (e: any) => {
        this.props.increase();
    }
    onDecrease = (e: any) => {
        this.props.decrease();
    }
    onReset = (e: any) => {
        this.props.reset();
    }
    render(): JSX.Element {
        console.log(this.props);
        return (
            <div className="normal">
                tests
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
