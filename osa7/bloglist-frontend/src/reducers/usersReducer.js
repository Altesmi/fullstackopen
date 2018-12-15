import userService from '../services/users'

const usersReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data

    case 'REMOVE_BLOG_FROM_USER':
      const notChanged = store.filter(user => user.id !== action.id)
      let changeUser = store.find(user=>user.id === action.id)

      changeUser.blogs = changeUser.blogs.filter(blog => blog._id !== action.blogid)

      return notChanged.concat(changeUser) 

      case 'ADD_BLOG_TO_USER':
        const notChangedWhenAdded = store.filter(user => user.id !== action.id)
        let changeUserWhenAdded = store.find(user=>user.id === action.id)
        changeUserWhenAdded.blogs.concat(action.blog)
        return notChangedWhenAdded.concat(changeUserWhenAdded)
    default:
      return store
  }
}

export const usersInitialization = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const removeBlogfromUser = (id,blogid) => {
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    id: id,
    blogid: blogid
  }
}

export const addBlogToUser = (id, blog) => {
  return {
    type: 'ADD_BLOG_TO_USER',
    id,
    blog,
  }
}

export default usersReducer
