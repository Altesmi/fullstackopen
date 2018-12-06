import React from 'react';


class App extends React.Component {
  voteAnecdote = (id) => () => {
    this.props.store.dispatch({type: 'VOTE', data: {id: id}})
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    this.props.store.dispatch({type: 'NEW_ANECDOTE', data: {content: content.toString()}})
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a,b)=> b.votes-a.votes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="content" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App