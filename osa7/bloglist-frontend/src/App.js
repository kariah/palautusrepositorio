/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Userlist from './components/Userlist'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser, getLoggedInUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
// import _ from 'lodash'

const App = (props) => {
  const [username, setUsername] = useState('khtest5')
  const [password, setPassword] = useState('passu5')

  // const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})
  const dispatch = useDispatch()

  //message handling - kokeilu
  // let message = null
  // const blogsMessage = useSelector(state => state.blogs.message)
  // const usersMessage =useSelector(state => state.users.message)
  // if (blogsMessage !== undefined && blogsMessage !== null)
  // {
  //   message = blogsMessage
  // }
  // else if (usersMessage !== undefined && usersMessage !== null)
  // {
  //   message = usersMessage
  // }//

  const divStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'none',
    borderWidth: 1,
    paddingBottom: 20
  }

  const blogs = useSelector(state => state.blogs.blogs)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch, user])

  //test
  const state = useSelector(state => state)
  console.log('state ', state)
  //test

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))
      //async wait Promise(dispatch(loginUser(username, password)))
      setUsername('')
      setPassword('')
      dispatch(setNotification('Login succeeded', 10))
    }
    catch (exception) {
      dispatch(setNotification('Wrong credentials', 10))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    window.location.href = '/'
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <div style={divStyle}>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}
          currentUser={user}
          newBlog={newBlog}
          setNewBlog={setNewBlog} />
      </Togglable>
    </div>
  )

  if (user === null) {
    return (
      <div>
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
          <button  id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }


  // if (user !== null) {

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
      </div>
      <div>
        <button id='logout-button' onClick={handleLogout}>logout</button>
      </div>
      <div>
        <h2>Users</h2>
        <div>
          <Userlist users={users} />
        </div>
      </div>
      <div>
        {blogForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          currentUser={user} />
      )}
    </div>
  )
  // }

}

export default App
