import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = ({ blog,
  currentUser }) => {

  const dispatch = useDispatch()

  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const hideBlogDetailsWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showBlogDetailsWhenVisible = { display: blogDetailsVisible ? '' : 'none' }


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
      user: currentUser
    }

    blog.likes = blogObject.likes

    dispatch(updateBlog(blogObject))
    dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} - likes updated`, 10))

    // dispatch(initializeBlogs())
  }

  const removeBlog = (event) => {
    event.preventDefault()

    let dialogResult = window.confirm(`Remove blog ${blog.title}?`)

    if (dialogResult === true) {
      dispatch(deleteBlog(blog))

      // if (message !== undefined && message !== null)
      // {
      //   dispatch(setNotification(message, 10))
      // }


      // let test = useSelector(state => state.blogs)
      // console.log('test ', test)

      // const test = useSelector => state.blogs)

      // dispatch(initializeBlogs())
      // return null
    }
    else {
      return
    }
  }

  // const deleteBlog = (blogObject) => {
  //   blogService
  //     .remove(blogObject.id)
  //     .then(returnedStatus => {
  //       if (returnedStatus === 204)
  //       {
  //         blogService
  //           .getAll()
  //           .then(blogs => {
  //             //setBlogs(blogs.sort((a, b) => a.likes - b.likes).reverse())
  //           })

  //         dispatch(setNotification(`Blog ${blogObject.title} by ${blogObject.author} deleted`, 10))
  //       }
  //       else
  //       {
  //         dispatch(setNotification(`Delete blog ${blogObject.title} failed`, 10))
  //       }
  //     })
  //     .catch(_error => {
  //       dispatch(setNotification(`Delete blog ${blogObject.title} failed`, 10))
  //     })
  // }


  function RemoveButton(user, currentUser) {
    if (user.id === currentUser.id)
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
        <div style={hideBlogDetailsWhenVisible}>
          <button id='view-button' className='view-button' onClick={() => setBlogDetailsVisible(true)}>View</button>
        </div>
        <div style={showBlogDetailsWhenVisible}>
          <div className='url'>{blog.url}</div>
          <div id='likes-div' className='likes'>likes {blog.likes} <button id='update-likes-button' className='update-likes-button'  onClick={updateLikes}>like</button></div>
          <div>
            <button  id='hide-button' className='hide-button' onClick={() => setBlogDetailsVisible(false)}>Hide</button>
          </div>
          <RemoveButton user={blog.user} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default Blog