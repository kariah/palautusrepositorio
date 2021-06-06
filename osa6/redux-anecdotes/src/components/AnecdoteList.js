import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { cancelNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {  
  // console.log(props.setNotification)
 
  // const dispatch = useDispatch()    
  // const anecdotes = useSelector(({ filter, anecdotes }) => {
  //   if ( filter === '' ) {
  //     return anecdotes
  //   }
  //   return anecdotes.filter(anecdote => anecdote.content.includes(filter)) 
  // }) 

  function handleVoteClick(anecdote) {  

    return function() {
      // dispatch(vote(anecdote)) 
      // dispatch(setNotification(`You voted: ${anecdote.content}`, 10)) 

      props.vote(anecdote)
      // props.cancelNotification(props.tim)
      props.setNotification(`You voted: ${anecdote.content}`, 10)
      //props.setNotification(``, 0)
      //props.setNotification(``, 10) 
    }
  } 

  return( 
    <> 
    <ul>
        {props.anecdotes 
        .map(anecdote =>
        <div key={anecdote.id}>
          <div> 
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}  
            <button onClick={handleVoteClick(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </ul>
    </>
  )
}

const mapStateToProps = (state) => {
  console.log('state? ', state)

  if (state.filter === '' ) {
    return {
      anecdotes: state.anecdotes
    }
  }  
  return {
    anecdotes: (state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter)))
  } 
}

const mapDispatchToProps = {
  setNotification,
  cancelNotification,
  vote
} 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)