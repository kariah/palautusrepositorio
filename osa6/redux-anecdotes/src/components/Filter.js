import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer' 

const Filter = (props) => {
//   const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    event.preventDefault() 
    const filteredValue = event.target.value   
    // dispatch(filterChange(filteredValue))
    props.filterChange(filteredValue)
  } 
 
  return (
      <>  
      <div>filter <input name="filter-text" onChange={handleFilterChange} /></div> 
    </>
  )
} 

const mapDispatchToProps = {
    filterChange
}
  
export default connect(
    null,
    mapDispatchToProps
)(Filter)