import { TodoActions } from '@/redux/actions';
import { RootState } from './state';

const Type = TodoActions.Type;

// initState
const initState: RootState.CounterState = {
    count: 0
};

// reducer
export function counterReducer(state = initState, action: any) {
    switch (action.type) {
        case Type.INCREMENT:
            return {
                count: state.count + 1
            };
        case Type.DECREMENT:
            return {
                count: state.count - 1
            };
        case Type.RESET:
            return {count: 0};
        default:
            return state;
    }
}
