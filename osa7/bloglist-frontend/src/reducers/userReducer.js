import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (store = [], action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.user

    case 'LOG_OUT':
      return []

    case 'SET_USER':
      return action.user

    default:
      return store
  }
}

export const logIn = user => {
  return async dispatch => {
    const loggedUser = await loginService.login(user)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedUser))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      user: loggedUser
    })
  }
}

export const setUser = user => {
  blogService.setToken(user.token)
  return {
    type: 'SET_USER',
    user
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken('')
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export default userReducer
