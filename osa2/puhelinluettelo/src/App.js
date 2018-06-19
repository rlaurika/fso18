import React from 'react';
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className="message">
        {message}
      </div>
    )
  }
}

const PersonTableItem = ({ name, number, delHandler }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><button name="del_button" onClick={delHandler}>poista</button></td>
    </tr>
  )
}

const PersonTable = ({ persons, filter, delHandler }) => {
  return (
    <table>
      <tbody>
        {persons.filter(
          person => { return person.name.toLowerCase().includes(filter.toLowerCase()) }
        ).map(
          person => <PersonTableItem
                      key={person.name}
                      name={person.name}
                      number={person.number}
                      delHandler={delHandler(person.id)}/>)
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
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let addName = true
    let person_to_update = ''

    this.state.persons.forEach(function(item, index, array) {
      if (item.name === personObject.name) {
        person_to_update = item.id
        addName = false;
      }
    })

    if (addName) {
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            message: `Lisättiin ${newPerson.name}`
          })
          setTimeout (() => {
            this.setState({message: null})
          }, 5000)
        })
    } else {
      const ok_to_replace =
        window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)

      if (ok_to_replace) {
        personService
          .update(person_to_update, personObject)
          .then(newPerson => {
            this.setState({
              persons: this.state.persons.map(person => person.id === person_to_update ? newPerson : person),
              newName: '',
              newNumber: '',
              message: `Päivitettiin henkilön ${newPerson.name} tiedot`
            })
            setTimeout (() => {
              this.setState({message: null})
            }, 5000)
          })
      }
    }
  }

  deletePerson = (id) => {
    return () => {
      const personObject = this.state.persons.find(person => person.id === id)
      const ok_to_delete = window.confirm(`Poistetaanko ${personObject.name}?`)

      if (ok_to_delete) {
        personService
          .remove(id)
          .then(() => {
            this.setState({
              persons: this.state.persons.filter(n => n.id !== id),
              message: `Poistettiin ${personObject.name}`
            })
            setTimeout (() => {
              this.setState({message: null})
            }, 5000)
          })
      }
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
        <Notification message={this.state.message}/>
        <FilterField filter={this.state.filter} handleFilterChange={this.handleFilterChange}/>
        <h2>Lisää uusi</h2>
        <NewPersonForm newName={this.state.newName}
                       newNumber={this.state.newNumber}
                       addPerson={this.addPerson}
                       handleNameChange={this.handleNameChange}
                       handleNumberChange={this.handleNumberChange}/>
        <h2>Numerot</h2>
        <PersonTable
          persons={this.state.persons}
          filter={this.state.filter}
          delHandler={this.deletePerson}/>
      </div>
    )
  }
}

export default App