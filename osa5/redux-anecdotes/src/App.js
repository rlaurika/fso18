import React from 'react';

class App extends React.Component {
  voteHandler = (id) => () => {
    this.props.store.dispatch({ type: 'VOTE', data: id })
  }

  handleNewAnecdoteSubmit = (event) => {
    event.preventDefault()
    this.props.store.dispatch({ type: 'NEW_ANECDOTE', data: event.target.anecdote.value })
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()

    const sortedAnecdotes = anecdotes.sort((a, b) => {
      return b.votes - a.votes
    })

    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteHandler(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleNewAnecdoteSubmit}>
          <div><input name="anecdote"/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App