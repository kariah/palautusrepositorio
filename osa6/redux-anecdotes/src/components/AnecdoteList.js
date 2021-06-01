import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdotes = () => {
  const dispatch = useDispatch()
  // const anecdotes = useSelector(state => state.anecdotes)  

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter)) 
  }) 

  function  handleVoteClick(anecdoteId, content) {
    return function() {
      dispatch(vote(anecdoteId))
      dispatch(setNotification(`You voted: ${content}`))
    }
  } 

  return( 
    <> 
    <ul>
        {anecdotes 
        .map(anecdote =>
        <div key={anecdote.id}>
          <div> 
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} 
            <button onClick={handleVoteClick(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </ul>
    </>
  )
}

export default Anecdotes