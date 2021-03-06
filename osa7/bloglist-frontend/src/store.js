import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  notifications: notificationReducer,
  users: usersReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
