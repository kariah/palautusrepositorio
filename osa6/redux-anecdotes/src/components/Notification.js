import { setNotification } from '../reducers/notificationReducer'
import { setNotificationTimerId } from '../reducers/notificationReducer'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import React from 'react'  
import '../global.js'
 
 
// const Notification = () => {
const Notification = (props) => {
 
  // const dispatch = useDispatch()  
  // const notification = useSelector(state => state.notification) 

  // console.log(props.setNotificationTimerId)

  // console.log('notificationTimerId ', notificationTimerId)

  let style = { display: 'none' }
  
  if (props.notification.message !== null)
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }  
 
  const visibilityTimeout = props.notification.timeInSeconds * 1000
   
  // console.log('props.notification.timeoutId ', props.notification.timeoutId)
  // console.log('props.notification.message ', props.notification.message)
 
  if (props.notification.message !== null)
  {
      let timerId = setTimeout(() => { 
         props.setNotification(null, 0) 
      }, visibilityTimeout)  
      
     global.notificationtimerId = timerId
    //  console.log('timerid set ',  global.notificationtimerId)  
  } 
 
  return (
    <div style={style}>
      {props.notification.message}  
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    // timeoutId: state.timeoutId
  }
}

const mapDispatchToProps = {
  setNotification 
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)


