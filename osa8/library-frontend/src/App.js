import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const resultAuthors = useQuery(ALL_AUTHORS)
  // const resultAuthors = useQuery(ALL_AUTHORS, {
  //   pollInterval: 2000
  // })
  const resultBooks = useQuery(ALL_BOOKS)

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
   
  const [page, setPage] = useState('authors')
  
  if (resultAuthors.loading || resultBooks.loading)  {
    return <div>loading...</div>
  }
  
  // let loggedInVisibility = {} 
  // if (!token) 
  // {
  //   loggedInVisibility = { display: 'none' }
  // }


  const LoggingButtons = () => { 
    if (!token) {
      return ( 
      
          <button onClick={() => setPage('login')}>login</button> 
      
      )
    }
    else
    {
      return ( 
       <>
          <button onClick={() => setPage('add')}>add book</button>
          <button>logout</button>
       </> 
      )
    }
  }

  const LoggedInUserFunctions = () => { 
    if (!token) {
      return ( 
        <></>
      )
    }
    else
    {
      return ( 
        <div>
        <NewBook
          show={page === 'add'}
        />   
      </div>
      )
    }
  }

  const LogInVisibility = () => { 
    if (!token && page === 'login') {
      return ( 
        <>
        <LoginForm show={page === 'login'}
        setToken={setToken}
        setError={notify}
      /> </>
      )
    }
    else
    {
      return ( 
        <></> 
      )
    }
  }


  return (
    <div>
       <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <LoggingButtons></LoggingButtons>
      </div>

      <Authors
        show={page === 'authors'} authors={resultAuthors.data.allAuthors} setError={notify} isUserLoggedIn={(token === null ? false  : true)}
      />

      <Books
        show={page === 'books'} books={resultBooks.data.allBooks}   
      /> 
      <LoggedInUserFunctions></LoggedInUserFunctions>
      <LogInVisibility></LogInVisibility>
    </div>
  )
}

export default App