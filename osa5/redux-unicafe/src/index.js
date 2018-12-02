import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const feedBackAverage = (state) => {
  let feedbackSum = 0
  feedbackSum += state.good
  feedbackSum -= state.bad

  let feedbackCount = state.good + state.ok + state.bad

  if (feedbackCount === 0) {
    return 0
  } else {
    return (feedbackSum/feedbackCount).toFixed(1)
  }
}

const positiveFeedbackCount = (state) => {
  return state.good + state.ok
}

const Statistiikka = ({zeroHandler}) => {
  const state = store.getState()
  const palautteita = state.good + state.ok + state.bad
  const keskiarvo = feedBackAverage(state)
  const positiivisia = positiveFeedbackCount(state)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={zeroHandler}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => {
    return () => {
      store.dispatch({ type: nappi })
    }
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka zeroHandler={this.klik('ZERO')}/>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)