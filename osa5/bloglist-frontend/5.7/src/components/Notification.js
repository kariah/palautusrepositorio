// import React from 'react'

// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   }

//   return (
//     <div className="error">
//       {message}
//     </div>
//   )
// }

// export default Notification

import React from 'react'

const Notification = (props) => {
    const infoMessage = props.infoMessage
    const errorMessage = props.errorMessage

    if (infoMessage === null && errorMessage === null) {
        return null
    }

    console.log("infomessage ", infoMessage)
    console.log("errorMessage ", errorMessage)


    if (infoMessage !== undefined && infoMessage !== null) {
        return (
            <div className="info">
                {infoMessage} 
            </div>)
    }
    else if (infoMessage !== undefined && errorMessage !== null) {
        return (
            <div className="error">
                {errorMessage} 
            </div>)
    }
    else
    {
      return (
        <div> 
        </div>)
    }
}


export default Notification