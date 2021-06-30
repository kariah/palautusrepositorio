import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateBlog, deleteBlog, addCommentToBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {

  if (!blog) {
    return null
  }
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    paddingBottom: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    border: '1px solid #cfcab4'
  }

  const updateLikes = (event) => {
    event.preventDefault()

    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: user
    }

    try {

      blog.likes = blogObject.likes

      dispatch(updateBlog(blogObject))
      dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} - likes updated`, 10))
    } catch (e) {
      dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} - update like failed`, 10))
    }
  }

  const removeBlog = (event) => {
    event.preventDefault()

    let dialogResult = window.confirm(`Remove blog ${blog.title}?`)

    try {
      if (dialogResult === true) {
        dispatch(deleteBlog(blog))
        history.push('/')
      }
      else {
        return
      }
    } catch (e) {
      dispatch(setNotification(`Remove blog ${blog.title} failed`, 10))
    }
  }

  function RemoveButton(blogUser) {
    if (blogUser.id === user.id)
    {
      return <div>
        <Button id='remove-button' onClick={removeBlog}>remove</Button>
      </div>
    }
    else
    {
      return <></>
    }
  }

  const handleCommentChange = (event) => {
    let comment = event.target.value
    setComment(comment)
  }

  const addComment = (event) => {
    event.preventDefault()
    try
    {
      dispatch(addCommentToBlog(blog, comment))
      setComment('')
    } catch (e) {
      dispatch(setNotification(`Add comment to blog ${blog.title} failed`, 10))
    }
  }

  return (
    <div style={blogStyle}>
      <div id='blog-title' className='title blog-title'>{blog.title}</div>
      <div className='author'>{blog.author}</div>
      <div>
        <div>
          <div className='url'>{blog.url}</div>
          <div id='likes-div' className='likes'>likes {blog.likes} <button id='update-likes-button' className='update-likes-button'  onClick={updateLikes}>like</button></div>
          <RemoveButton blogUser={blog.user} />
        </div>
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit = {addComment}>
                Comment:
          <input
            value={comment}
            onChange={handleCommentChange}
            id="comment"
          />
          <Button type="submit">Add comment</Button>
        </form>
      </div>
      <div>List of comments here  blog.comments.map jne</div>
    </div>
  )
}

export default Blog