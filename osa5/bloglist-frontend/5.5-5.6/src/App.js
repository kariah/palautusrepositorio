import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([]) 
    const [username, setUsername] = useState('khtest5')
    const [password, setPassword] = useState('passu5')
    const [user, setUser] = useState(null)
    const [currentUserId, setCurrentUserId] = useState(null)
    const [infoMessage, setInfoMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)   

    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
        likes: 0,
        userId: null
    })
 

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
 
            setUser(user)
            blogService.setToken(user.token)

            blogService
                .getAll()
                .then(blogs => {
                    setBlogs(blogs)
                })

            //find userId
            userService
                .getAll()
                .then(users => {
                    let currentUser = users.filter(x => x.username === user.username)
                    setCurrentUserId(currentUser[0].id)
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

            blogService
                .getAll()
                .then(blogs => {
                    setBlogs(blogs)
                })

            //find userId
            userService
                .getAll()
                .then(users => {
                    let currentUser = users.filter(x => x.username === username)
                    setCurrentUserId(currentUser[0].id)
                })

        } catch (exception) { 
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.href = '/'
    } 
    
    const addBlog = (blogObject) => { 
        blogFormRef.current.toggleVisibility()
 
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog)) 
            
                console.log('setinfomessage')
        

                setInfoMessage(`Blog ${returnedBlog.title} by ${returnedBlog.author} added`)
                setTimeout(() => {
                    setInfoMessage(null)
                }, 5000)
            })
            .catch(error => { 
                setErrorMessage(`Add blog ${newBlog.title} failed`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000) 
            }) 
    }  

    const blogFormRef = useRef()

    const blogForm = () => ( 
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm   createBlog={addBlog} 
                        currentUserId={currentUserId} 
                        newBlog={newBlog}
                        setNewBlog={setNewBlog}
                        />
        </Togglable>
       )


    if (user === null) {
        return (
            <div> 
                <Notification infoMessage={infoMessage} errorMessage={errorMessage} />
                <h2>Login</h2> 
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
            <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>  
            <Notification infoMessage={infoMessage} errorMessage={errorMessage} />
            <h2>blogs</h2> 
            <div>
                <button onClick={handleLogout}>logout</button>
            </div>
            <p>{user.name} logged in</p>
            <div>   
                {blogForm()}
            </div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

}

export default App