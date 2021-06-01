// import { createStore, combineReducers  } from 'redux'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer' 

// import thunk from 'redux-thunk'

// import noteReducer from './reducers/noteReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
//   composeWithDevTools(
//     applyMiddleware(thunk)
//   )
)


// console.log(store.getState())

export default store