const notificationReducer = (state = '', action) => { 
    // console.log('state now (2): ', state)
    // console.log('action (2)', action)

    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.message 
      default: 
        return state
    }
  }
  
  export const setNotification = message => {
    return {
      type: 'SET_NOTIFICATION',
      message,
    }
  } 
  
  export default notificationReducer