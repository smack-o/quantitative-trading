import { CounterModel } from '@/redux/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
    router: RouterState;
    counter: CounterModel;
}

export namespace RootState {
    export type CounterState = CounterModel;
}
