import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { anecdoteInit } from './reducers/anecdoteReducer'

class App extends React.Component {
  componentWillMount = () => {
    this.props.anecdoteInit()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <h2>Anecdotes</h2>
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInit })(App)