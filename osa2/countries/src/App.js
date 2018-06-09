import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const CountryView = (props) => {
  const countries = props.countries
  const filter = props.filter

  const countries_filtered = countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  })

  if (countries_filtered.length > 10) {
    return (
      <div>too many countries, specify another filter</div>
    )
  } else if (countries_filtered.length === 1) {
    const country = countries_filtered[0]

    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img className='flag' alt='Flag' src={country.flag}/>
      </div>
    )
  } else if (countries_filtered.length === 0) {
    return (
      <div>no country found</div>
    )
  } else {
    return (
      <div>
        {countries_filtered.map(country =>
          <div key={country.name} >{country.name}</div>
        )}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    return(
      <div>
        <div>find countries: <input value={this.state.filter} onChange={this.handleFilterChange}/></div>
        <CountryView countries={this.state.countries} filter={this.state.filter}/>
      </div>
    )
  }
}

export default App;
