import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationSetter, notificationZeroer }  from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.store.dispatch(anecdoteCreation(e.target.anecdote.value))
    this.props.store.dispatch(notificationSetter(`Anecdote '${e.target.anecdote.value}' added!`))
    setTimeout(() => {
      this.props.store.dispatch(notificationZeroer())
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
