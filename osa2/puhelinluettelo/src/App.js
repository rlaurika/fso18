import React from 'react';

const PersonListItem = (props) => {
  const name = props.name

  return (
    <div>{name}</div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName
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
        newName: ''
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
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
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          {this.state.persons.map(person => <PersonListItem 
                                             key={person.name}
                                             name={person.name}/>)}
        </div>
      </div>
    )
  }
}

export default App