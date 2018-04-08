import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <p>{props.osa1_nimi} {props.osa1_tehtavia}</p>
            <p>{props.osa2_nimi} {props.osa2_tehtavia}</p>
            <p>{props.osa3_nimi} {props.osa3_tehtavia}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.osa1_tehtavia +
                props.osa2_tehtavia +
                props.osa2_tehtavia} tehtävää</p>
        </div>
    )      
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto 
        osa1_nimi={osa1}
        osa2_nimi={osa2}
        osa3_nimi={osa3}
        osa1_tehtavia={tehtavia1}
        osa2_tehtavia={tehtavia2}
        osa3_tehtavia={tehtavia3}
      />
      <Yhteensa
        osa1_tehtavia={tehtavia1}
        osa2_tehtavia={tehtavia2}
        osa3_tehtavia={tehtavia3}
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
