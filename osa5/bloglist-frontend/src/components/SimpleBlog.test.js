import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  let simpleBlogComponent
  let blog
  let mockClickHandler

  beforeEach(() => {
    blog = {
      title: 'There is no longer any such thing as Computer Security',
      author: 'Jeff Atwood',
      likes: 6
    }

    mockClickHandler = jest.fn()

    simpleBlogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockClickHandler}
      />
    )
  })

  it('renders title and author', () => {
    const titleAndAuthorDiv = simpleBlogComponent.find('.title_and_author')
    expect(titleAndAuthorDiv.text()).toContain(`${blog.title} ${blog.author}`)
  })

  it('renders likes', () => {
    const likesDiv = simpleBlogComponent.find('.likes')
    expect(likesDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })

  it('registers correct amount of clicks in its click handler', () => {
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockClickHandler.mock.calls.length).toBe(2)
  })
})