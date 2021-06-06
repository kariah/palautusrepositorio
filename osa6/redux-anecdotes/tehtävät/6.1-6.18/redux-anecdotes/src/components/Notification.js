import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'  
 

const Notification = () => {
  const dispatch = useDispatch() 

  const notification = useSelector(state => state.notification)
 
 
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  } 
 
  const visibilityTimeout = notification.timeInSeconds * 1000
  
  setTimeout(() => { 
  }, 1000)
  setTimeout(() => {
    dispatch(setNotification(''))
  }, visibilityTimeout) 
 
  return (
    <div style={style}>
      {notification.message}  
    </div>
  )
}

export default Notification