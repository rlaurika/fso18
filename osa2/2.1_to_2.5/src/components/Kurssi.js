import React from 'react'

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

export default Kurssi