import { GET_STGS_SUCCESS } from '../actions/strategy'

// initState
const initState = {
  stgs: []
}

// reducer
export default function counterReducer (state = initState, action) {
  switch (action.type) {
    case GET_STGS_SUCCESS:
      return state
    default:
      return state
  }
}
