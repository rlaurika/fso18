import React from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import NotificationBox from './components/NotificationBox'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newBlogTitle: '',
      newBlogAuthor: '',
      newBlogURL: '',
      notification: null,
      notificationClass: null
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

  showNotification = ({ notification, notificationClass }) => {
    this.setState({ notification: notification,
      notificationClass: notificationClass })
    setTimeout(() => {
      this.setState({ notification: null, notificationClass: null })
    }, 3000)
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
      this.showNotification({ notification: 'Invalid username or password',
        notificationClass: 'error' })
    }
  }

  doLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    this.setState({ user: null })
  }

  createNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: this.state.newBlogTitle,
        author: this.state.newBlogAuthor,
        url: this.state.newBlogURL
      }

      let response = await blogService.create(newBlog)

      const userId = response.user

      response.user = {
        _id: userId,
        name: this.state.user.name,
        username: this.state.user.username
      }

      this.setState({ newBlogTitle: '',
        newBlogAuthor: '',
        newBlogURL: '',
        blogs: this.state.blogs.concat(response) })

      this.showNotification({ notification: `Added new blog ${response.title} by ${response.author}`,
        notificationClass: 'notice' })
    } catch (exception) {
      this.showNotification({ notification: 'Could not add new blog',
        notificationClass: 'error' })
    }
  }

  likeBlog = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(blog => blog._id === id)

        const updatedBlog = { ...blog, likes: blog.likes+1 }

        await blogService.update(id, updatedBlog)
        let updatedBlogs = this.state.blogs
        updatedBlogs.splice(this.state.blogs.indexOf(blog), 1, updatedBlog)
        this.setState({ blogs: updatedBlogs })
      } catch (exception) {
        this.showNotification({ notification: `Could not like blog: ${exception}`,
          notificationClass: 'error' })
      }
    }
  }

  delBlog = (id) => {
    return async () => {
      try {
        const blog = this.state.blogs.find(blog => blog._id === id)

        if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
          await blogService.remove(id)

          const updatedBlogs = this.state.blogs.filter(blog => blog._id !== id)
          this.setState({ blogs: updatedBlogs })

          this.showNotification({ notification: `Deleted '${blog.title}' by ${blog.author}`,
            notificationClass: 'notice' })
        }
      } catch (exception) {
        const blog = this.state.blogs.find(blog => blog._id === id)
        this.showNotification({ notification: `Not authorized to remove blog '${blog.title}' added by ${blog.user.name}`,
          notificationClass: 'error' })
      }
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNewBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const newBlog = {
      title: this.state.newBlogTitle,
      author: this.state.newBlogAuthor,
      url: this.state.newBlogURL
    }

    return (
      <div>
        <NotificationBox
          notificationClass={this.state.notificationClass}
          notification={this.state.notification}
        />
        { this.state.user === null ?
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
            <Togglable buttonLabel="create new blog">
              <NewBlogForm
                newBlog={newBlog}
                createNewBlog={this.createNewBlog}
                handleNewBlogFieldChange={this.handleNewBlogFieldChange}
              />
            </Togglable>
            <BlogList
              blogs={this.state.blogs}
              currentUser={this.state.user.username}
              likeButtonHandler={this.likeBlog}
              delButtonHandler={this.delBlog}
            />
          </div>
        }
      </div>
    )
  }
}

export default App
