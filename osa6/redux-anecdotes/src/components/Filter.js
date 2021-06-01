import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer' 

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    event.preventDefault() 
    const filteredValue = event.target.value  
    
    // console.log('content ', filteredValue)

    dispatch(filterChange(filteredValue))
  }
 
 
  return (
      <>  
      <div>filter <input name="filter-text" onChange={handleFilterChange} /></div> 
    </>
  )
}

export default Filter
