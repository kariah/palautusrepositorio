import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
// import PropTypes from 'prop-types'

const BlogForm = ({ user }) => {
  const dispatch = useDispatch()

  const [newBlog, setNewBlog] = useState({})

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user: user
    }

    try
    {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} added`, 10))

      setNewBlog({})

      event.target.reset()
    } catch (e) {
      dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} add failed`, 10))
    }
  }

  const handleBlogChange = (event) => {
    const value = event.target.value

    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            title: <input id='title'  className='title' type="text" name="title" onChange={handleBlogChange} />
        </div>
        <div>
             author: <input id='author'  className='author' type="text" name="author" onChange={handleBlogChange} />
        </div>
        <div>
             url: <input id='url' className='url' type="text" name="url" onChange={handleBlogChange} />
        </div>
        <div>
            likes: <input id='likes' type="number" name="likes" onChange={handleBlogChange} />
        </div>
        <div>
          <Button  id='save-button' className='submit-form' type="submit">save</Button>
        </div>
      </form>
    </div>
  )
}

// BlogForm.propTypes = {
//   //createBlog: PropTypes.func.isRequired,
//   // currentUser: PropTypes.object.isRequired
// }


export default BlogForm
