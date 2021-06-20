/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
  let blogs = []
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('khtest5')
  const [password, setPassword] = useState('passu5')
  const [user, setUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [newBlog, setNewBlog] = useState({})
  const dispatch = useDispatch()

  const allBlogs = useSelector(state => state.blogs)
  blogs = allBlogs

  const divStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'none',
    borderWidth: 1,
    paddingBottom: 20
  }

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)

      dispatch(initializeBlogs())

      // blogService
      //   .getAll()
      //   .then(blogs2 => {
      //     // setBlogs(blogs.sort((a, b) => a.likes - b.likes).reverse())
      //     // console.log('haku ', blogs2)
      //     // blogs = blogs2
      //   })

      // blogs = dispatch(initializeBlogs())

      //find user
      userService
        .getAll()
        .then(users => {
          let currentUser = users.filter(x => x.username === user.username)
          setCurrentUser(currentUser[0])
        })
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      // console.log('user: ', user)

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')

      dispatch(initializeBlogs())

      // blogService
      //   .getAll()
      //   .then(blogs2 => {
      //     //setBlogs(blogs.sort((a, b) => a.likes - b.likes).reverse())
      //     // blogs = blogs2
      //   })

      //blogs = dispatch(initializeBlogs())

      //find userId
      userService
        .getAll()
        .then(users => {
          let currentUser = users.filter(x => x.username === username)
          setCurrentUser(currentUser[0].id)
        })

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

    // blogService
    //   .create(blogObject)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.concat(returnedBlog))
    //     console.log('returnedBlog ', returnedBlog)
    //     dispatch(setNotification(`Blog ${returnedBlog.title} by ${returnedBlog.author} added`, 10))
    //   })
    //   .catch(_error => {
    //     dispatch(setNotification(`Add blog ${newBlog.title} failed`, 10))
    //   })
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} updated`, 10))
      })
      .catch(_error => {
        dispatch(setNotification(`Update blog ${blogObject.title} failed`, 10))
      })
  }

  const deleteBlog = (blogObject) => {
    blogService
      .remove(blogObject.id)
      .then(returnedStatus => {
        if (returnedStatus === 204)
        {
          blogService
            .getAll()
            .then(blogs => {
              //setBlogs(blogs.sort((a, b) => a.likes - b.likes).reverse())
            })

          dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} deleted`, 10))
        }
        else
        {
          dispatch(setNotification(`Delete blog ${blogObject.title} failed`, 10))
        }
      })
      .catch(_error => {
        dispatch(setNotification(`Delete blog ${blogObject.title} failed`, 10))
      })
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
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          currentUser={currentUser} />
      )}
    </div>
  )

}

export default App
