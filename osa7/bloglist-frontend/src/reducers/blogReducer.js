import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data

    case 'ADD_NEW_BLOG':
      return [
        ...store,
        {
          id: action.id,
          user: action.user,
          likes: action.likes,
          author: action.author,
          url: action.url,
          title: action.title,
          comments: action.comments
        }
      ]

    case 'DELETE_BLOG':
      let blogsAfterDelete = store
      blogsAfterDelete = blogsAfterDelete.filter(b => b.id !== action.id)
      return blogsAfterDelete

    case 'INCREASE_LIKES':
      const rest = store.filter(b => b.id !== action.newBlog.id)
      let blogToBeIncremented = store.find(b => b.id === action.newBlog.id)

      return [...rest, { ...blogToBeIncremented, likes: blogToBeIncremented.likes + 1 }]

    case 'ADD_NEW_COMMENT':
      const uncommentedBlogs = store.filter(b => b.id !== action.id)

      let blogWhereCommentIsAdded = store.find(b => b.id === action.id)
      return [...uncommentedBlogs, { ...blogWhereCommentIsAdded, comments: blogWhereCommentIsAdded.comments.concat({_id: action.commentId, content: action.content}) }]

    default:
      return store
  }
}

export const blogsInitialization = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const blogCreation = newBlog => {
  return async dispatch => {
    const addedBlog = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_NEW_BLOG',
      id: addedBlog.id,
      user: addedBlog.user,
      author: addedBlog.author,
      url: addedBlog.url,
      title: addedBlog.title,
      likes: addedBlog.likes,
      comments: addedBlog.comments
    })
  }
}

export const blogDelete = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      id: id
    })

  }
}

export const increaseLikes = blog => {
  return async dispatch => {
    const newBlog = await blogService.increaseLike(blog)
    dispatch({
      type: 'INCREASE_LIKES',
      newBlog: newBlog
    })
  }
}

export const addComment = (id,content) => {
  return async dispatch => {
    const newComment = await blogService.postComment(id,content)
    dispatch({
      type: 'ADD_NEW_COMMENT',
      content: newComment.content,
      commentId: newComment.id,
      id: id
    })
  }
}

export default blogReducer
