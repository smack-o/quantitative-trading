import { GET_USERINFO_SUCCESS } from '../actions/user'

// initState
const initState = {
  isLogin: false,
  userInfo: {}
}

// reducer
export default function userReducer (state = initState, action) {
  switch (action.type) {
    case GET_USERINFO_SUCCESS:
      return {
        userInfo: action.data || {}
      }
    default:
      return state
  }
}
