import blogService from '../services/blogs'

const initialState = {
  blogs: []
}

//const blogReducer = (state = [],  action) => {
const blogReducer = (state = initialState,  action) => {
  switch(action.type) {
  case 'INITIALIZE_BLOGS':
  {
    return action.data
  }
  case 'NEW_BLOG':
  {
    return {
      blogs: [...state.blogs, action.data]
    }
  }
  case 'UPDATE_BLOG': {
    const blogId = action.data.updatedBlog.id
    const updatedBlog = action.data.updatedBlog

    const blogToChange = state.blogs.find(n => n.id === updatedBlog.id)

    const changedBlog = {
      ...blogToChange,
      votes: updatedBlog.votes
    }

    const blogs = state.blogs
      .map(blog =>
        blog.id !== blogId ? blog : changedBlog
      )

    return {
      blogs: blogs
    }
  }
  case 'DELETE_BLOG':  {
    const blogs = state.blogs.filter(n => n.id !== action.data.blogId)

    return {
      blogs: blogs,
      message: action.data.message
    }
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    console.log('all blogs (INITIALIZE_BLOGS)', blogs)

    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: { blogs: blogs },
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create( {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user
    })
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })

    //voidaan käyttää paluuarvona
    //return newBlog
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)

    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    //const returnedStatus = await blogService.remove(blog.id)
    // let message = null

    // if (returnedStatus === 204)
    // {
    //   message = `Blog ${blog.title} by ${blog.author} deleted`
    // }
    // else
    // {
    //   message =`Delete blog ${blog.title} failed`
    // }

    dispatch({
      type: 'DELETE_BLOG',
      data: { blogId: blog.id }
    })
  }
}

export default blogReducer