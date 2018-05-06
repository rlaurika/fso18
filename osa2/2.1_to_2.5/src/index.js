import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = (props) => {
  const kurssi = props.kurssi

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  const osat = props.osat

  const show_parts = () => osat.map(osa =>
    <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia}/>
  )

  return (
    <div>
      {show_parts()}
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.nimi} {props.tehtavia}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  const osat = props.osat
  const totalReducer = (acc, cur) => acc + cur;
  const total = () => osat.map(osa => osa.tehtavia).reduce(totalReducer, 0);

  return (
    <div>
      <p>yhteensä {total()} tehtävää</p>
    </div>
  )
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        },
        {
          nimi: 'Kokoelmien renderöinti',
          tehtavia: 5,
          id: 4
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
