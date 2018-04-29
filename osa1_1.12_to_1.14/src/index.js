import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({action, text}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: [0, 0, 0, 0, 0, 0]
    }
  }

  setRandomSelection = (max) => {
    let selection = Math.floor(Math.random() * Math.floor(max));
    return () => {
      this.setState({selected: selection});
    }
  }

  castVote = (number) => {
    const pointsCopy = [...this.state.points]
    pointsCopy[number] += 1
    return () => {
      this.setState({points: pointsCopy})
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
          <p>has {this.state.points[this.state.selected]} points</p>
        </div>
        <div>
          <Button action={this.castVote(this.state.selected)}
                  text='vote'/>
          <Button action={this.setRandomSelection(this.props.anecdotes.length - 1)}
                  text='next anecdote'/>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)