import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)
const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content: content,
    votes: 0,
    id: getId()
  }
  const response = await axios.post(baseURL, newAnecdote)

  return response.data

}

const updateVoted = async (id) => {
  let updatedAnecdote = await axios.get(`${baseURL}/${id}`)
  updatedAnecdote = updatedAnecdote.data
  updatedAnecdote.votes = updatedAnecdote.votes + 1
  const response = await axios.put(`${baseURL}/${id}`, updatedAnecdote)

  return response.data
}

export default { getAll, createNew, updateVoted }