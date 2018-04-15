import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }

  giveFeedback = (feedbackType) => {
    if (feedbackType === 'good') {
      return () => {
        this.setState({ good: this.state.good + 1 })
      }
    } else if (feedbackType === 'neutral') {
      return () => {
        this.setState({ neutral: this.state.neutral + 1 })
      }
    } else if (feedbackType === 'bad') {
      return () => {
        this.setState({ bad: this.state.bad + 1 })
      }
    }
  }

  feedbackAverage = () => {
    let feedbackSum = 0
    feedbackSum += this.state.good
    feedbackSum -= this.state.bad

    let feedbackCount = this.state.good + this.state.neutral + this.state.bad

    if (feedbackCount === 0) {
      return 0
    } else {
      return (feedbackSum/feedbackCount).toFixed(1)
    }
  }

  percentPositive = () => {
    let positive = this.state.good
    let nonpositive = this.state.neutral + this.state.bad

    if (positive === 0 && nonpositive === 0) {
      return 0
    } else {
      return ((positive/(positive+nonpositive))*100).toFixed(1)
    }
  }

  render() {
    return (
      <div>
        <div><h1>anna palautetta</h1></div>
        <div>
          <button onClick={this.giveFeedback('good')}>hyvä</button>
          <button onClick={this.giveFeedback('neutral')}>neutraali</button>
          <button onClick={this.giveFeedback('bad')}>huono</button>
        </div>
        <div><h1>statistiikka</h1></div>
        <div>hyvä {this.state.good}</div>
        <div>neutraali {this.state.neutral}</div>
        <div>huono {this.state.bad}</div>
        <div>keskiarvo {this.feedbackAverage()}</div>
        <div>positiivisia {this.percentPositive()} %</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
