import { combineReducers } from 'redux'
import counterReducer from './counter'
import userReducer from './user'
import strategyReducer from './strategy'
import headerReducer from './header'

export default combineReducers({
  counter: counterReducer,
  user: userReducer,
  strategy: strategyReducer,
  header: headerReducer
})
