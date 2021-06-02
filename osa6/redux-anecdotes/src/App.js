import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList' 
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux' 
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => { 
  const dispatch = useDispatch()
  // useEffect(() => {
  //   personService
  //       .getAll()
  //       .then(initialPersons => {
  //           setPersons(initialPersons)
  //           setShowAll(initialPersons)
  //       })
  // }, [])
 

  useEffect(() => {
    console.log('service')
    anecdoteService
    .getAll()
    .then(initialAnecdotes => dispatch(initializeAnecdotes(initialAnecdotes)))
  }, [dispatch])

  // and this is what I have in "store.js"

  // anecdoteService.getAll().then(anecdotes =>   
  //     store.dispatch(initializeAnecdotes(anecdotes))  
  // )

  // console.log('anecdoteService')
  // useEffect(() => {
  //     anecdoteService
  //       .getAll()
  //       .then(initialAnecdotes => { 
  //         console.log(initialAnecdotes)
  //       })
  // }, [])

  return (
    <div> 
   <h2>Anecdotes</h2>
    <Notification /> 
    <Filter /> 
    <AnecdoteList /> 
    <AnecdoteForm />
    </div>
  )
}

export default App