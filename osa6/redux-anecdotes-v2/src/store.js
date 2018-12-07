import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer
})

const store = createStore(reducer)

export default store