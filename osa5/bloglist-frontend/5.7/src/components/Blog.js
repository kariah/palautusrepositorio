import React, { useState } from 'react'


const Blog = ({ blog }) => {
    const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
    const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
    const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title}
            </div> 
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setBlogDetailsVisible(true)}>View</button>
                </div>
                <div style={showWhenVisible}> 
                    <div>{blog.url}</div>
                    <div>likes {blog.likes} <button>like</button></div>
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