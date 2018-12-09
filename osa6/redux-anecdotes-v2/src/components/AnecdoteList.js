import React from 'react'
import { connect } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVoting = (id) => async () => {
    const votedAnecdote = this.props.anecdotesToShow.find(anecdote => anecdote.id === id)

    this.props.voting(id)
    this.props.notify(`Voted for '${votedAnecdote.content}'`, 5)
  }

  render() {
    return (
      <div>
        {this.props.anecdotesToShow
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { voting,
    notify })(AnecdoteList)
