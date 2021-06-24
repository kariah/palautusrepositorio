// import userService from './services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  user: null,
  message: null
}

//const blogReducer = (state = [],  action) => {
const userReducer = (state = initialState,  action) => {
  switch(action.type) {
  case 'LOGIN_USER':
  {
    return {
      user: action.data.user,
      message: action.data.message }
  }
  default:
    return state
  }
}

//6.15
export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })

    console.log('user ', user)

    let message = null
    if (user !== null)
    {
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    }
    else
    {
      message = 'Login Failed'
    }

    dispatch({
      type: 'LOGIN_USER',
      data: { user : user, message : message }
    })
  }
}

export default userReducer