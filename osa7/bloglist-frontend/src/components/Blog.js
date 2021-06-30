import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateBlog, deleteBlog, addCommentToBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {

  if (!blog) {
    return null
  }
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.user)

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
      dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} likes updated`, 10))
    } catch (e) {
      dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} update like failed`, 10, true))
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
      dispatch(setNotification(`Remove blog ${blog.title} failed`, 10, true))
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
      dispatch(setNotification(`Add comment to blog ${blog.title} failed`, 10, true))
    }
  }

  return (
    <div>
      <div id='blog-title' className='title blog-title'>{blog.title}</div>
      <div className='author'>{blog.author}</div>
      <div>
        <div>
          <div className='url'>{blog.url}</div>
          <div id='likes-div' className='likes'>likes {blog.likes} <Button id='update-likes-button' className='update-likes-button'  onClick={updateLikes}>like</Button></div>
          <RemoveButton blogUser={blog.user} />
        </div>
      </div>
      <div>
        <h4>Comments</h4>
        <form onSubmit = {addComment}>
                Comment
          <input
            value={comment}
            onChange={handleCommentChange}
            id="comment"
          />
          <Button type="submit">Add comment</Button>
        </form>
      </div>
      <ListGroup>
        {blog.comments.map((comment) =>
          <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default Blog