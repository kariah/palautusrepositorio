import React from 'react' 

const BlogForm = ({ createBlog,
                    currentUser,
                    newBlog,
                    setNewBlog}) => {

    const addBlog = (event) => {
        event.preventDefault() 
        
        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: newBlog.likes,
            user: currentUser
        }
 
        createBlog(blogObject)
 
        // setNewBlog({ 
        //     title: '',
        //     author: '',
        //     url: '',
        //     likes: 0,
        //     user: null
        // })
 
        setNewBlog({})

        event.target.reset();
    }
  
    const handleBlogChange = (event) => {
        const value = event.target.value;
 
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
                    title: <input type="text" name="title" onChange={handleBlogChange} />
                </div>
                <div>
                    author: <input type="text" name="author" onChange={handleBlogChange} />
                </div>
                <div>
                    url: <input type="text" name="url" onChange={handleBlogChange} />
                </div>
                <div>
                    likes: <input type="number" name="likes" onChange={handleBlogChange} />
                </div>
                <div>
                    <button type="submit">save</button>
                </div> 
            </form>
        </div>
    )
}

export default BlogForm
