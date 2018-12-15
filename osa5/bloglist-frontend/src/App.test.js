import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when no user is logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders only the login view', () => {
      const loginFormComponents = app.find(LoginForm)
      const blogListComponents = app.find(BlogList)
      const newBlogFormComponents = app.find(NewBlogForm)

      expect(loginFormComponents).toHaveLength(1)
      expect(blogListComponents).toHaveLength(0)
      expect(newBlogFormComponents).toHaveLength(0)
    })
  })

  describe('when a user is logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'ttester',
        token: '1123581321',
        name: 'Tom Tester'
      }

      localStorage.setItem('loggedInUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('renders the list of blogs and the new blog form', () => {
      app.update()

      const loginFormComponents = app.find(LoginForm)
      const blogListComponents = app.find(BlogList)
      const newBlogFormComponents = app.find(NewBlogForm)
      const blogComponents = app.find(Blog)

      expect(loginFormComponents).toHaveLength(0)
      expect(blogListComponents).toHaveLength(1)
      expect(newBlogFormComponents).toHaveLength(1)
      expect(blogComponents).toHaveLength(blogService.blogs.length)
    })
  })
})