import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {

  if (!blog) {
    return null
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.user)

  console.log('blog from Route ', blog)
  console.log('user (blog) ', user)

  // const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  // const hideBlogDetailsWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  // const showBlogDetailsWhenVisible = { display: blogDetailsVisible ? '' : 'none' }


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

    blog.likes = blogObject.likes

    dispatch(updateBlog(blogObject))
    dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} - likes updated`, 10))
  }

  const removeBlog = (event) => {
    event.preventDefault()

    let dialogResult = window.confirm(`Remove blog ${blog.title}?`)

    if (dialogResult === true) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
    else {
      return
    }
  }

  function RemoveButton(blogUser) {
    if (blogUser.id === user.id)
    {
      return <div>
        <button id='remove-button' onClick={removeBlog}>remove</button>
      </div>
    }
    else
    {
      return <></>
    }
  }

  return (
    <div style={blogStyle}>
      <div id='blog-title' className='title blog-title'>{blog.title}</div>
      <div className='author'>{blog.author}</div>
      <div>
        {/* <div style={hideBlogDetailsWhenVisible}>
          <button id='view-button' className='view-button' onClick={() => setBlogDetailsVisible(true)}>View</button>
        </div>
        <div style={showBlogDetailsWhenVisible}>
          <div className='url'>{blog.url}</div>
          <div id='likes-div' className='likes'>likes {blog.likes} <button id='update-likes-button' className='update-likes-button'  onClick={updateLikes}>like</button></div>
          <div>
            <button  id='hide-button' className='hide-button' onClick={() => setBlogDetailsVisible(false)}>Hide</button>
          </div>
          <div>
          <button id='view-button' className='view-button' onClick={() => setBlogDetailsVisible(true)}>View</button>
        </div> */}
        <div>
          <div className='url'>{blog.url}</div>
          <div id='likes-div' className='likes'>likes {blog.likes} <button id='update-likes-button' className='update-likes-button'  onClick={updateLikes}>like</button></div>
          <RemoveButton blogUser={blog.user} />
        </div>
      </div>
    </div>
  )
}

export default Blog