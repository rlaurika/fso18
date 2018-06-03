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
        { name: 'Arto Hellas', number: '040 123456' }
      ],
      newName: '',
      newNumber: ''
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

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
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
            {this.state.persons.map(person => <PersonListItem
                                              key={person.name}
                                              name={person.name}
                                              number={person.number}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App