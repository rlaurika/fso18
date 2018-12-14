import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { PageHeader } from 'react-bootstrap'

const Menu = () => {
  const activeStyle = {
    fontWeight: 'bold',
    border: '2px solid',
    borderRadius: 5,
    padding: 5
  }

  const menuBarStyle = {
    backgroundColor: '#99eeff',
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 3,
    paddingBottom: 9
  }

  return (
    <div style={menuBarStyle}>
      <NavLink exact to='/' activeStyle={activeStyle} >anecdotes</NavLink>&nbsp;
      <NavLink exact to='/create' activeStyle={activeStyle}>create new</NavLink>&nbsp;
      <NavLink exact to='/about' activeStyle={activeStyle}>about</NavLink>&nbsp;
    </div>
  )
}

const Notification = ({notification}) => {
  const notificationBoxStyle = {
    borderLeft: '5px solid',
    marginTop: 10,
    backgroundColor: '#99eeff',
    borderRadius: 5,
    display: ( notification === '' ? 'none' : '' )
  }

  const notificationTextStyle = {
    padding: 10
  }

  return (
    <div style={notificationBoxStyle}>
      <p style={notificationTextStyle}>{notification}</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>)}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row>
        <Col sm={8} md={9}>
          <p>According to Wikipedia:</p>

          <p><em>An anecdote is a brief, revealing account of an individual person or an incident. 
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is
            not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
            such as to characterize a person by delineating a specific quirk or trait, to communicate an
            abstract idea about a person, place, or thing through the concrete details of a short narrative. 
            An anecdote is "a story with a point."</em></p>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col sm={2} md={2}>
          <img alt='Alan Turing at age 16' src='img/Alan_Turing_Aged_16.jpg'/>
        </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.notify(`a new anecdote ${this.state.content} created!`)
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Content:</Col>
            <Col sm={9}>
              <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
            </Col>
            <Col componentClass={ControlLabel} sm={2}>Author:</Col>
            <Col sm={9}>
              <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
            </Col>
            <Col componentClass={ControlLabel} sm={2}>URL for more info:</Col>
            <Col sm={9}>
              <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
            </Col>
            <Col sm={9} smOffset={2}>
              <Button bsStyle="success" type="submit">create</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  notify = (notification) => {
    this.setState({ notification: notification })
    setTimeout(() => {
      this.setState({ notification: ''})
    }, 10000)
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div  className="container">
        <Router>
          <div>
            <PageHeader>Software anecdotes</PageHeader>
            <Menu />
            <Notification notification={this.state.notification}/>
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create" render={({history}) =>
              <CreateNew history={history} addNew={this.addNew} notify={this.notify}/>} />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
