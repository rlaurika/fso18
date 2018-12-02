import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders only the login view when no user is logged in', () => {
    const loginFormComponents = app.find(LoginForm)
    const blogListComponents = app.find(BlogList)
    const newBlogFormComponents = app.find(NewBlogForm)

    expect(loginFormComponents.length).toEqual(1)
    expect(blogListComponents.length).toEqual(0)
    expect(newBlogFormComponents.length).toEqual(0)
  })
})