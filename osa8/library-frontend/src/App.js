import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
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

  return (
    <div>
       <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authors={resultAuthors.data.allAuthors} setError={notify}
      />

      <Books
        show={page === 'books'} books={resultBooks.data.allBooks}   
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App