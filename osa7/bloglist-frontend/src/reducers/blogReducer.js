import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch(action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'NEW_BLOG':
    console.log('action ', action)
    console.log('state now: ', state)
    return [...state, action.data]
  default:
    return state
  }
}

//6.15
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    console.log('all ', blogs)

    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs,
    })
  }
}

//6.16
export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create( {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes,
      user: blogObject.user
    })
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}


export default blogReducer