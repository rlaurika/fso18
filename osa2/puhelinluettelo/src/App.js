import React from 'react';

const PersonTableItem = (props) => {
  const name = props.name
  const number = props.number

  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
}

const PersonTable = (props) => {
  const persons = props.persons
  const filter = props.filter

  return (
    <table>
      <tbody>
        {persons.filter(
          person => { return person.name.toLowerCase().includes(filter.toLowerCase()) }
        ).map(
          person => <PersonTableItem key={person.name} name={person.name} number={person.number}/>)
        }
      </tbody>
    </table>
  )
}

const NewPersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        nimi: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        numero: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const FilterField = (props) => {
  return (
    <div>
      rajaa näytettäviä: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let addName = true;

    this.state.persons.forEach(function(item, index, array) {
      if (item.name === personObject.name) {
        alert('Nimi on jo lisätty');
        addName = false;
      }
    })

    if (addName) {
      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <FilterField filter={this.state.filter} handleFilterChange={this.handleFilterChange}/>
        <h2>Lisää uusi</h2>
        <NewPersonForm newName={this.state.newName}
                       newNumber={this.state.newNumber}
                       addPerson={this.addPerson}
                       handleNameChange={this.handleNameChange}
                       handleNumberChange={this.handleNumberChange}/>
        <h2>Numerot</h2>
        <PersonTable persons={this.state.persons} filter={this.state.filter}/>
      </div>
    )
  }
}

export default App