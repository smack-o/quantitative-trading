import { UPDATE_HEADER_TABS } from '../actions/header'

// initState
const initState = {
  tabs: []
}

// reducer
export default function counterReducer (state = initState, action) {
  switch (action.type) {
    case UPDATE_HEADER_TABS:
      return {
        tabs: action.data || []
      }
    default:
      return state
  }
}
