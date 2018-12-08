import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationClearing } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVoting = (id) => () => {
    const votedAnecdote = this.props.store.getState().anecdotes.find(anecdote => anecdote.id === id)

    this.props.store.dispatch(voting(id))
    this.props.store.dispatch(notificationSetting(`Voted for '${votedAnecdote.content}'`))
    setTimeout(() => this.props.store.dispatch(notificationClearing()), 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter
    return (
      <div>
        {anecdotes
          .filter(anecdote => anecdote.content.includes(filter))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
              has {anecdote.votes}
                <button onClick={this.handleVoting(anecdote.id)}>
                vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default AnecdoteList
