import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null)
  {
    return <></>
  }

  const dispatch = useDispatch()
  // let style = { display: 'none' }

  // if (notification.message !== null)
  // {
  // if (!notification.isError)
  // {
  //   style = {
  //     border: 'solid',
  //     padding: 10,
  //     borderWidth: 1,
  //   }
  // }
  // else
  // {
  //   style = {
  //     border: 'solid',
  //     padding: 10,
  //     borderWidth: 1,
  //     backgroundColor: 'red',
  //     color: 'white'
  //   }
  //}
  // }

  const visibilityTimeout = notification.timeInSeconds * 1000

  setTimeout(() => {
    dispatch(setNotification(null))
  }, visibilityTimeout)

  if (!notification.isError)
  {
    return (
      <Alert variant='success'>
        <div>
          {notification.message}
        </div>
      </Alert>
    )
  }
  else
  {
    return (
      <Alert variant='danger'>
        <div>
          {notification.message}
        </div>
      </Alert>)
  }
}

export default Notification