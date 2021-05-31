import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
 

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return( 
    <>
    <h2>Anecdotes</h2>
    <ul>
        {anecdotes 
        .map(anecdote =>
        <div key={anecdote.id}>
          <div> 
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </ul>
    </>
  )
}

export default Anecdotes