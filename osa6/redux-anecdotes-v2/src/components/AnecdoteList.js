import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import {
  notificationSetter,
  notificationZeroer
} from '../reducers/notificationReducer'

import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleVote = (id, content) => () => {
    anecdoteService.updateVoted(id)
    this.props.anecdoteVoting(id)
    this.props.notificationSetter(`Anecdote '${content}' voted`)
    setTimeout(() => {
      this.props.notificationZeroer()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={this.handleVote(anecdote.id, anecdote.content)}
                >
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let filteredAnecdotes =
    state.filter.length > 0
      ? state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      : state.anecdotes
  filteredAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  return {
    anecdotesToShow: filteredAnecdotes
  }
}

export default connect(
  mapStateToProps,
  { anecdoteVoting, notificationSetter, notificationZeroer }
)(AnecdoteList)
