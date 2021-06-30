// import userService from './services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'


const userReducer = (state = null,  action) => {
  switch(action.type) {
  case 'LOGIN_USER':
  {
    return action.data
  }
  case 'LOGOUT':
    return {
      user: null
    }
  case 'INITIALIZE_USER':
    // console.log('user data (INITIALIZE_USER): ', action.data)
    return action.data
  default:
    return state
  }
}

export const getLoggedInUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch({
        type: 'INITIALIZE_USER',
        data: JSON.parse(loggedUserJSON),
      })
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })

    if (user !== null)
    {
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
    }

    dispatch({
      type: 'LOGIN_USER',
      data: user,
    })

    return user
  }
}


export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default userReducer