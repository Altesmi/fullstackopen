import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationSetter, notificationZeroer } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = (id,content) => () => {
    this.props.store.dispatch(anecdoteVoting(id))
    this.props.store.dispatch(notificationSetter(`Anecdote '${content}' voted`))
    setTimeout(() => {
      this.props.store.dispatch(notificationZeroer())
    }
    ,5000)
  }

  render() {
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={this.handleVote(anecdote.id,anecdote.content)}>
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

export default AnecdoteList
