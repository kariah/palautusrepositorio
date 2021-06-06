import { setNotification } from '../reducers/notificationReducer'
import { setNotificationTimerId } from '../reducers/notificationReducer'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import React from 'react'  
 

// const Notification = () => {
const Notification = (props) => {
  // const dispatch = useDispatch()  
  // const notification = useSelector(state => state.notification) 

  // console.log(props.setNotificationTimerId)

  let style = { display: 'none' }
  
  if (props.notification.message !== null)
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }  
 
  const visibilityTimeout = props.notification.timeInSeconds * 1000
   
  console.log('props.notification.timeoutId ', props.notification.timeoutId)
  console.log('props.notification.message ', props.notification.message)
 
  if (props.notification.message !== null)
  {
      let timerId = setTimeout(() => {
        props.setNotification(null, 0)
      }, visibilityTimeout)
      setNotificationTimerId('timerid ', timerId)
      console.log('timerid set ', timerId)  
    }

  // if (props.notification.message === null)
  // {
  //     console.log('clear timeoutId ', timeoutId)
  //     clearTimeout(timeoutId)
  // } 
 
  return (
    <div style={style}>
      {props.notification.message}  
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    timeoutId: state.timeoutId
  }
}

const mapDispatchToProps = {
  setNotification,
  setNotificationTimerId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)