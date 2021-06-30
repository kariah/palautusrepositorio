/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
// import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
// import { loginUser, logoutUser, getLoggedInUser } from './reducers/userReducer'
import { logoutUser, getLoggedInUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { Button, Nav } from 'react-bootstrap'


const Menu = () => {
  return (
    <div>
      <Nav className="justify-content-center" variant="pills">
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  href="/blogs">Blogs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  href="/users">Users</Nav.Link>
        </Nav.Item>
      </Nav>
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
      <LoginForm></LoginForm>
    )
  }

  let logInText = user.name !== undefined ? `${user.name} logged in` : ''

  if (user !== null)
    return (
      <div className="container">
        <Menu/>
        <Notification />
        <h2>blogs {user.name}</h2>
        <div>
          <p><b>{logInText}</b></p>
        </div>
        <div>
          <Button id='logout-button' onClick={handleLogout}>logout</Button>
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
