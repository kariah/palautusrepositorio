/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser } from './reducers/userReducer'

const App = (props) => {
  const [username, setUsername] = useState('khtest5')
  const [password, setPassword] = useState('passu5')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})
  const dispatch = useDispatch()

  let blogs = useSelector(state => state.blogs.blogs)


  let state = useSelector(state => state)
  console.log('state ', state)

  //message handling - ei kovin hyvä tapa!!
  let message = null
  let blogsMessage = useSelector(state => state.blogs.message)
  let usersMessage =useSelector(state => state.users.message)
  if (blogsMessage !== undefined && blogsMessage !== null)
  {
    message = blogsMessage
  }
  else if (usersMessage !== undefined && usersMessage !== null)
  {
    message = usersMessage
  }//

  let currentUser = useSelector(state => state.users.user)


  const divStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'none',
    borderWidth: 1,
    paddingBottom: 20
  }

  useEffect(() => {
    if (currentUser !== null)
    {
      setUser(currentUser)
      dispatch(initializeBlogs())
    }
  }, [currentUser])

  useEffect(() => {
    dispatch(setNotification(message, 10))
  }, [message])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      dispatch(initializeBlogs())
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))

      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 10))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
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
          currentUser={currentUser}
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

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>
        <button id='logout-button' onClick={handleLogout}>logout</button>
      </div>
      <p>{user.name} logged in</p>
      <div>
        {blogForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          currentUser={currentUser} />
      )}
    </div>
  )

}

export default App
