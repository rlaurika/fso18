import React from 'react';

const PersonListItem = (props) => {
  const name = props.name
  const number = props.number

  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
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
        <div>
          rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange}/>
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {this.state.persons.filter(
              person => { return person.name.toLowerCase().includes(this.state.filter.toLowerCase()) }
            ).map(
              person => <PersonListItem key={person.name} name={person.name} number={person.number}/>)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App