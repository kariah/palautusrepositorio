import React, { useState } from 'react'


const Blog = ({ blog,
                updateBlog,
                currentUser }) => {
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

      updateBlog(blogObject) 
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title}
            </div> 
            <div>
                <div style={hideBlogDetailsWhenVisible}>
                    <button onClick={() => setBlogDetailsVisible(true)}>View</button>
                </div>
                <div style={showBlogDetailsWhenVisible}> 
                    <div>{blog.url}</div>
                    <div>likes {blog.likes} <button onClick={updateLikes}>like</button></div>
                    <div>{blog.author}</div>
                    <div>
                        <button onClick={() => setBlogDetailsVisible(false)}>Hide</button>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Blog