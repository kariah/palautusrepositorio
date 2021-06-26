import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'


const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null)
  {
    return <></>
  }


  const dispatch = useDispatch()
  let style = { display: 'none' }

  if (notification.message !== null)
  {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }

  const visibilityTimeout = notification.timeInSeconds * 1000

  setTimeout(() => {
    dispatch(setNotification(null))
  }, visibilityTimeout)


  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification