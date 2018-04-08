import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
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

const Sisalto = (props) => {
    return (
        <div>
            <Osa nimi={props.osa1.nimi} tehtavia={props.osa1.tehtavia}/>
            <Osa nimi={props.osa2.nimi} tehtavia={props.osa2.tehtavia}/>
            <Osa nimi={props.osa3.nimi} tehtavia={props.osa3.tehtavia}/>
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.osa1.tehtavia +
                props.osa2.tehtavia +
                props.osa2.tehtavia} tehtävää</p>
        </div>
    )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto
        osa1={osa1}
        osa2={osa2}
        osa3={osa3}
      />
      <Yhteensa
        osa1={osa1}
        osa2={osa2}
        osa3={osa3}
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
