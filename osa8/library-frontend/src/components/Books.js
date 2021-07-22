/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
// import { useLazyQuery } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'


const Books = (props) => {
  const [books, setBooks] = useState('')  
  // const [getBooks, result] = useLazyQuery(ALL_BOOKS) 
  const [genre, setGenre] = useState('')
  
  const isUserLoggedIn = props.isUserLoggedIn
  const resultMe = useQuery(ME, { 
    skip: !isUserLoggedIn
  })

  // console.log('resultMe ', resultMe)
 
  // const showPerson = (name) => {
  //   getPerson({ variables: { nameToSearch: name } })
  // }

  // useEffect(() => {
  //   if (result.data) {
  //     setPerson(result.data.findPerson)
  //   }
  // }, [result])
  
  const filtering = props.filtering
  
  useEffect(() => {
    setBooks(props.books)
  }, [props.books]) 

  if (resultMe.loading)  {
    return <div>loading...</div>
  } 
 
  if (!props.show) {
    return null
  }   
 
  const PageTitle = () => { 
    if (!isUserLoggedIn || filtering === 'all_books') {
      return ( 
        <>
         <h2>books</h2>
       </>
      )
    }
    else
    {
      return ( 
        <>
         <h2>recommendations</h2>
         <div>
             books in your favourite genre <b>{resultMe.data.me.favoriteGenre}</b>
         </div>
        </> 
      )
    }
  }

  return (
    <div>
      <PageTitle></PageTitle>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {/*  TODO: Voisi muodostua dynaamisesti! */}
      <div>
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre('')}>allgenres</button>
      </div>
    </div>
  )
}

export default Books