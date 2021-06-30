const notificationReducer = (state = '', action) => {

  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = (message, timeInSeconds = 10, isError = false) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        timeInSeconds: timeInSeconds,
        isError: isError
      }
    })
  }
}

export default notificationReducer