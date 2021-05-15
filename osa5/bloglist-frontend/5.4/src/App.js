import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'

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

    // useEffect(() => {  
    //   blogService
    //     .getAll()
    //     .then(blogs => {
    //     setBlogs(blogs)
    //   })
    // }, []) 

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            console.log('user: ', user)

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

            console.log('user: ', user)


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


    // Form submitting logic, prevent default page refresh 
    const addBlog = (event) => {
        event.preventDefault()
 
        const blogObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: newBlog.likes,
            userId: currentUserId
        }

        // console.log('user: ', user)
        // console.log('blogObject: ', blogObject)

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog({
                    title: '',
                    author: '',
                    url: '',
                    likes: 0,
                    userId: null
                })
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

    const handleBlogChange = (event) => {
        const value = event.target.value;
        setNewBlog({
            ...newBlog,
            [event.target.name]: value
        })

        // console.log('newBlog: ', newBlog) 
    }

    const blogForm = () => (
        <form onSubmit={addBlog}> 
            <h2>Create new blog</h2>
            <Notification infoMessage={infoMessage} errorMessage={errorMessage} />
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
    )

    if (user === null) {
        return (
            <div> 
                <h2>Login</h2> 
                <Notification infoMessage={infoMessage} errorMessage={errorMessage} />
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