import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({action, text}) => {
  return (
    <button onClick={action}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad, avg, positive}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (<p>ei yhtään palautetta annettu</p>)
  } else {
    return (
    <table>
      <tbody>
        <Statistic text='hyvä' value={good}/>
        <Statistic text='neutraali' value={neutral}/>
        <Statistic text='huono' value={bad}/>
        <Statistic text='keskiarvo' value={avg}/>
        <Statistic text='positiivisia' value={positive} postfix='%'/>
      </tbody>
    </table>
    )
  }
}

const Statistic = ({text, value, postfix}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {postfix}</td>
    </tr>
  )
}

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
    return () => {
      this.setState({ [feedbackType]: this.state[feedbackType] + 1} )
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
          <Button action={this.giveFeedback('good')} text='hyvä'/>
          <Button action={this.giveFeedback('neutral')} text='neutraali'/>
          <Button action={this.giveFeedback('bad')} text='huono'/>
        </div>
        <div><h1>statistiikka</h1></div>
        <Statistics good={this.state.good}
                    neutral={this.state.neutral}
                    bad={this.state.bad}
                    avg={this.feedbackAverage()}
                    positive={this.percentPositive()}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
