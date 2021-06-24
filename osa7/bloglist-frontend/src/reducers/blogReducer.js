import blogService from '../services/blogs'

const initialState = {
  blogs: []
}

//const blogReducer = (state = [],  action) => {
const blogReducer = (state = initialState,  action) => {
  switch(action.type) {
  case 'INITIALIZE_BLOGS':
  {
    const blogs = action.data
    return { blogs: blogs }
  }
  case 'NEW_BLOG':
  {
    // console.log('action 2 ', action)
    // console.log('state now 2: ', state)
    // console.log('state blogs 2: ', state.blogs)

    return {
      blogs: [...state.blogs, action.data],
      message: null
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
      blogs: blogs,
      returnedStatus: null
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

//6.15
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    // console.log('all blogs ', blogs)

    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs,
    })
  }
}

//6.16
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
    const returnedStatus = await blogService.remove(blog.id)
    let message = null

    if (returnedStatus === 204)
    {
      message = `Blog ${blog.title} by ${blog.author} deleted`
    }
    else
    {
      message =`Delete blog ${blog.title} failed`
    }

    dispatch({
      type: 'DELETE_BLOG',
      data: { blogId: blog.id, message : message }
    })
  }
}

export default blogReducer