import React from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  doLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (exception) {
      alert('invalid username or password')
    }
  }

  doLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    this.setState({ user: null })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      ( this.state.user === null ?
        <div>
          <LoginForm
            doLogin={this.doLogin}
            handleLoginFieldChange={this.handleLoginFieldChange}
          />
        </div> :
        <div>
          <div>
            <p>{this.state.user.name} logged in</p>
            <button onClick={this.doLogout}>log out</button>
          </div>
          <BlogList blogs={ this.state.blogs }/>
        </div>
      )
    );
  }
}

export default App;
