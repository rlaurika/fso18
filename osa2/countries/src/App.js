import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const CountryInfoView = (props) => {
  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>capital: {props.country.capital}</p>
      <p>population: {props.country.population}</p>
      <img className='flag' alt='Flag' src={props.country.flag}/>
    </div>
  )
}

class CountryListView extends Component {
  render() {
    const countries = this.props.countries
    const filter = this.props.filter

    const countries_filtered = countries.filter(country => {
      return country.name.toLowerCase().includes(filter.toLowerCase())
    })

    if (countries_filtered.length > 10) {
      return (
        <div>too many countries, specify another filter</div>
      )
    } else if (countries_filtered.length === 1) {
      const country = countries_filtered[0]

      return (<CountryInfoView country={country}/>)
    } else if (countries_filtered.length === 0) {
      return (
        <div>no country found</div>
      )
    } else {
      return (
        <div>
          {countries_filtered.map(country =>
            <div key={country.name} onClick={this.props.countryClickHandler}>{country.name}</div>
          )}
        </div>
      )
    }
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

  countryClickHandler = (event) => {
    this.setState({ filter: event.target.innerHTML })
  }

  render() {
    return(
      <div>
        <div>find countries: <input value={this.state.filter} onChange={this.handleFilterChange}/></div>
        <CountryListView
          countries={this.state.countries}
          filter={this.state.filter}
          countryClickHandler={this.countryClickHandler}/>
      </div>
    )
  }
}

export default App;
