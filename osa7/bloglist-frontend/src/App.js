/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser, getLoggedInUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 20
  }
  return (
    <div>
      <Link style={padding} to="/">Home</Link>
      <Link style={padding} to="/blogs">Blogs </Link>
      <Link style={padding} to="/users">Users </Link>
    </div>
  )
}

const App = (props) => {
  const [username, setUsername] = useState('khtest5')
  const [password, setPassword] = useState('passu5')
  const dispatch = useDispatch()

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


  const userRouteMatch = useRouteMatch('/users/:id')
  const userMatch = userRouteMatch
    ? users.find(user => user.id === userRouteMatch.params.id)
    : null


  const blogRouteMatch = useRouteMatch('/blogs/:id')
  const blogMatch = blogRouteMatch
    ? blogs.find(blog => blog.id === blogRouteMatch.params.id)
    : null

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    if (user !== null)
    {
      dispatch(initializeBlogs())
    }
  }, [dispatch, user])

  //testng
  const state = useSelector(state => state)
  console.log('state ', state)
  //testing

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      //testing
      //const loggedInUser = dispatch(loginUser(username, password))
      // loggedInUser.then(user =>
      //   //console.log('user result: ', user.name)
      // )
      dispatch(loginUser(username, password))
      dispatch(loginUser(username, password))
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

  const blogFormRef = useRef()

  const blogForm = () => (
    <div style={divStyle}>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm user={user} />
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

  let logInText = user.name !== undefined ? `${user.name} logged in` : ''

  if (user !== null)
    return (
      <div>
        <Menu/>
        <Notification />
        <h2>blogs {user.name}</h2>
        <div>
          <p>{logInText}</p>
        </div>
        <div>
          <button id='logout-button' onClick={handleLogout}>logout</button>
        </div>
        <Switch>
          <Route path ="/users/:id">
            <div>
              <h2>User</h2>
              <div>
                <User user={userMatch} />
              </div>
            </div>
          </Route>
          <Route path ="/users/">
            <div>
              <h2>Users</h2>
              <div>
                <Users users={users} />
              </div>
            </div>
          </Route>
          <Route path ="/blogs/:id">
            <div>
              <h2>Blog</h2>
              <div>
                <Blog blog={blogMatch} />
              </div>
            </div>
          </Route>
          <Route path ="/blogs/">
            <div>
              <h2>Blogs</h2>
              <div>
                {blogForm()}
              </div>
              <Blogs blogs={blogs} />
            </div>
          </Route>
        </Switch>
      </div>
    )

}

export default App
