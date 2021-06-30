
import React, { useState } from 'react'
import Notification from '../components/Notification'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'
import loginService from '../services/login'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      //testing
      //   const loggedInUser = dispatch(loginUser(username, password))
      //   loggedInUser.then(user =>
      //     console.log('user result: ', user.name)
      //   )
      //   dispatch(loginUser(username, password))
      const loggingUser = await loginService.login({
        username, password,
      })
      //   console.log('loggingUser ', loggingUser)
      if (loggingUser === null)
      {
        dispatch(setNotification('Wrong credentials', 10, true))
      }
      else
      {
        setUsername('')
        setPassword('')
        dispatch(setNotification('Login succeeded', 10))
        dispatch(loginUser(loggingUser))
      }
    }
    catch (exception) {
      dispatch(setNotification('Wrong credentials', 10, true))
    }
  }

  return (
    <div className="container">
      <Notification />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
                      username
          <input id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                      password
          <input  id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button  id='login-button' type="submit">login</Button>
      </form>
    </div>
  )
}

export default LoginForm
