import React from 'react'
import { connect } from 'react-redux'
import { voting } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationClearing } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVoting = (id) => () => {
    const votedAnecdote = this.props.anecdotes.find(anecdote => anecdote.id === id)

    this.props.voting(id)
    this.props.notificationSetting(`Voted for '${votedAnecdote.content}'`)
    setTimeout(() => this.props.notificationClearing(), 5000)
  }

  render() {
    const anecdotes = this.props.anecdotes
    const filter = this.props.filter
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(
  mapStateToProps,
  { voting,
    notificationSetting,
    notificationClearing })(AnecdoteList)
