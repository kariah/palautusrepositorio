// import userService from './services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  user: null,
  message: null,
  users: null
}

const userReducer = (state = initialState,  action) => {
  switch(action.type) {
  case 'INITIALIZE_USERS':
  {
    const users = action.data
    return {
      user: [state.user],
      users: users
    }
  }
  case 'LOGIN_USER':
  {
    return {
      user: action.data.user,
      message: action.data.message,
      users: action.data.users,
    }
  }
  default:
    return state
  }
}


export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'INITIALIZE_USERS',
      data: users,
    })
  }
}
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

    const users = await userService.getAll()

    dispatch({
      type: 'LOGIN_USER',
      data: {
        user : user,
        message : message,
        users: users
      }
    })
  }
}


export default userReducer