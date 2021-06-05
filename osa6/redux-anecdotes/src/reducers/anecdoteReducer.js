/* eslint-disable no-fallthrough */
// const anecdotesAtStart = [
//   'If it hurts, do it more often 2',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

import anecdoteService from '../services/anecdotes'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject) 

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  let anecdotesToSort 

  switch(action.type) {
    case 'INITIALIZE_ANECDOTES':   
      // TODO: Function
      anecdotesToSort = action.data 
      anecdotesToSort.sort(function (a, b) {
        return a.votes - b.votes ||  a.content.localeCompare(b.content)
      }); 
      return anecdotesToSort.reverse() 

    case 'NEW_ANECDOTE': 
      return [...state, action.data] 
    case 'ADD_VOTE':
      const id = action.data.id
      
      console.log('id: ', id)
      console.log('state now2: ', state)

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


 //6.17
export const vote = (anecdote) => { 
 
  let data =  {
    id: anecdote.id,
    votes: anecdote.votes + 1 
  } 
 
  return async dispatch => {
    const changedAnecdote = await anecdoteService.update(data)  
    
    dispatch({
      type: 'ADD_VOTE',
      data: { id: changedAnecdote.id }
    })
  }
} 

export default anecdoteReducer  