import { INCREMENT, DECREMENT, RESET } from '../actions/counter'

// initState
const initState = {
  count: 0
}

// reducer
export default function counterReducer (state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      }
    case DECREMENT:
      return {
        count: state.count - 1
      }
    case RESET:
      return { count: 0 }
    default:
      return state
  }
}
