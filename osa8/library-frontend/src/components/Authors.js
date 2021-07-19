import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')
  
  const setError = props.setError
  // const [ changeBirthyear, result ] = useMutation(EDIT_AUTHOR)

  const [ changeBirthyear, result ] = useMutation(EDIT_AUTHOR, { 
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message) 
    }
  }) 

  useEffect(() => { 
    console.log('result.data ', result.data)
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
      setError('Author not found')
    }
  }, [result.data])  // eslint-disable-line 

  if (!props.show) {
    return null
  }
  const authors = props.authors 

  const submit = async (event) => {
    event.preventDefault()
 
    const setBornTo = birthyear
    changeBirthyear({ variables: { name, setBornTo } }) 

    setName('')
    setBirthyear('')
  } 

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={submit}>
      <div>
        <h3>Set birthyear</h3>
        <div>name
        <input
            type='text'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>born
        <select value={birthyear}  onChange={({ target }) => setBirthyear(parseInt(target.value))}>
            <option selected value="">Valitse</option>
            <option value="1980">1980</option>
            <option value="1981">1981</option>
            <option value="1982">1982</option>
      </select>
 
        {/* <input
            type='number'
            value={birthyear}
            onChange={({ target }) => setBirthyear(parseInt(target.value))}
          /> */}
        </div>
        <div><button type='submit'>Update author</button></div>
      </div>  
      </form>
    </div>
  )
}

export default Authors