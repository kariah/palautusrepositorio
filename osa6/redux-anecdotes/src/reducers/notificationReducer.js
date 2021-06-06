const notificationReducer = (state = '', action) => {  

    switch (action.type) {
      case 'SET_NOTIFICATION': 
        return action.data 
      case 'SET_NOTIFICATION_TIMERID': 
        console.log('action.data ', action.data)
        return action.data   
      case 'CANCEL_NOTIFICATION': 
        console.log('clear timeoutId ', action.data.timerId)
        clearTimeout(action.data.timerId)

        return action.data 
      default: 
        return state
    }
  }
  
  export const setNotification = (message, timeInSeconds = 10) => {   
    return async dispatch => { 
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { 
                message: message,
                timeInSeconds: timeInSeconds 
              }
      })
    }
  } 

  export const cancelNotification = (timerId) => {   
    return async dispatch => { 
      dispatch({
        type: 'CANCEL_NOTIFICATION',
        data: { 
                timerId: timerId 
              }
      })
    }
  } 

  export const setNotificationTimerId = (timerId) => {   
    return async dispatch => { 
      dispatch({
        type: 'SET_NOTIFICATION_TIMERID',
        data: { 
                timerId: timerId 
              }
      })
    }
  } 

  // export const cancelNotification = () => {   
  //   return async dispatch => { 
  //     dispatch({
  //       type: 'SET_NOTIFICATION',
  //       data: { 
  //               message: message,
  //               timeInSeconds: timeInSeconds
  //             }
  //     })
  //   }
  // } 
  
  export default notificationReducer