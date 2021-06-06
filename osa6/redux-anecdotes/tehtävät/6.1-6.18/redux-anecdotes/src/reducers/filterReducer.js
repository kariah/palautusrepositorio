const filterReducer = (state = '', action) => {
    // console.log('action 2: ', action)

    switch (action.type) {
      case 'SET_FILTER':
        console.log('action.filter ', action.filter)
        return action.filter
      default:
        return state
    }
  }
  
  export const filterChange = filter => {
    console.log('filter ', filter)
    return {
      type: 'SET_FILTER',
      filter,
    }
  }
  
  export default filterReducer