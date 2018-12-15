import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const delUrl = `/api/blogs/${id}`

  const response = await axios.delete(delUrl, config)

  return response.data
}

const increaseLike = async (blogObject) => {
  const putUrl = `/api/blogs/${blogObject.id}`

  const data = {
    user: blogObject.user._id,
    likes: blogObject.likes + 1,
    author: blogObject.author,
    url: blogObject.url,
    title: blogObject.title
  }
  try {

    const response = await axios.put(putUrl, data)
    return response.data // this is the modified blog

  } catch (exception) {
    console.log(exception)
  }
}

const postComment = async (id, content) => {
  const commentUrl = `/api/blogs/${id}/comments`

  const data = { content }

  try {
    const response = await axios.post(commentUrl, data)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

export default {
  getAll,
  setToken,
  create,
  increaseLike,
  deleteBlog,
  postComment
}