import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import {
  notificationSetter,
  notificationZeroer
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  getId = () => (100000 * Math.random()).toFixed(0)
  handleSubmit = e => {
    e.preventDefault()
    const newId = this.getId()
    anecdoteService.createNew(newId, e.target.anecdote.value)
    this.props.anecdoteCreation(newId,e.target.anecdote.value)
    this.props.notificationSetter(
      `Anecdote '${e.target.anecdote.value}' added!`
    )
    setTimeout(() => {
      this.props.notificationZeroer()
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

export default connect(
  null,
  { anecdoteCreation, notificationSetter, notificationZeroer }
)(AnecdoteForm)
