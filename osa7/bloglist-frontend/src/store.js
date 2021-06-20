import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// import { createStore, combineReducers  } from 'redux'
// import { createStore } from 'redux'
// import notificationReducer from './reducers/notificationReducer'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store