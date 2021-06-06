import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  
  let anecdotesToSort 

  switch(action.type) {
    case 'INITIALIZE_ANECDOTES':   
      // TODO: Tämä pitäisi siirtää componenttiin joten on hiukan väärässä paikassa ...
      anecdotesToSort = action.data 
      anecdotesToSort.sort(function (a, b) {
        return a.votes - b.votes ||  a.content.localeCompare(b.content)
      }); 
      return anecdotesToSort.reverse() 

    case 'NEW_ANECDOTE': 
      return [...state, action.data] 
    case 'ADD_VOTE':
      const id = action.data.id 

      const anecdoteToChange = state.find(n => n.id === id)
 
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      } 

      anecdotesToSort = state
        .map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
 
      anecdotesToSort.sort(function (a, b) {
        return a.votes - b.votes ||  a.content.localeCompare(b.content)
      }); 
      return anecdotesToSort.reverse()  
   
    default:
      return state
  } 
}

//6.14
// export const createAnecdote = (content) => {  
//    let newAnecdote =  {
//     content: content 
//   }
 
//    anecdoteService
//       .create(newAnecdote) 
//       .then(returnedAnecdote => {  
//          newAnecdote = returnedAnecdote
//     })
 
//   return {
//     type: 'NEW_ANECDOTE', 
//     data: newAnecdote
//   }  
// } 

//6.13
// export const initializeAnecdotes = (anecdotes) => { 
//   return {
//     type: 'INITIALIZE_ANECDOTES',
//     data: anecdotes
//   }
// }

//6.15
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes,
    })
  }
}

//6.16
export const createAnecdote = (content) => {  
  let data =  {
    content: content 
  } 
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data) 
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  } 
} 

// export const setNotificationTimerId = (timerId) => { 
//     return async dispatch => { 
//       dispatch({
//         type: 'SET_NOTIFICATION_TIMERID',
//         timerId
//       })
//     }
// } 

 //6.17 ->
export const vote = (anecdote) => {  

  let data =  {
    id: anecdote.id,
    votes: anecdote.votes + 1 
  } 
 
  return async dispatch => {
    // eslint-disable-next-line no-unused-vars
    const changedAnecdote = await anecdoteService.update(data)   
    
    dispatch({
      type: 'ADD_VOTE',
      data: data
    })
  }
} 



// export const voteMsg = (notification, timer) => {
//   return async (dispatch) => {
//    clearTimeout(countdown);
//    await dispatch({ type: 'VOTE_MSG', notification });
//    const clear = null;
//    const countdown = setTimeout(() => {
//     dispatch({ type: 'CLR_MSG', clear });
//    }, timer * 1000);
//   };
//  };

export default anecdoteReducer  