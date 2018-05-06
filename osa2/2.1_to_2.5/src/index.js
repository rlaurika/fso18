import React from 'react'
import ReactDOM from 'react-dom'

const Kurssi = (props) => {
  const kurssi = props.kurssi
  
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
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

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
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
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
