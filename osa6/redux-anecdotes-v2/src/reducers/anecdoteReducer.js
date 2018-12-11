import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.content, id: action.id, votes: 0 }]
  }

  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteCreation = content => {
  return async dispatch => {
    const res = await anecdoteService.createNew(content)
    dispatch({ type: 'CREATE', content: content, id: res.id })
  }
}

export const anecdoteVoting = id => {
  return async dispatch => {
    await anecdoteService.updateVoted(id)
    dispatch({
      type: 'VOTE',
      id: id
    })
  }
}

export const anecdoteInitialization = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
