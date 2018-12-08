import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

class App extends React.Component {
  render() {
    const filteredAnecdotes =
      this.props.store.getState().filter.length > 0
        ? this.props.store
          .getState()
          .anecdotes.filter(anecdote =>
            anecdote.content
              .toLowerCase()
              .includes(this.props.store.getState().filter.toLowerCase())
          )
        : this.props.store.getState().anecdotes
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification store={this.props.store} />
        <Filter store={this.props.store} />
        <AnecdoteList store={this.props.store} anecdotes={filteredAnecdotes} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App
