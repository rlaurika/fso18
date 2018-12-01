import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let blogComponent
  let mockLikeHandler
  let mockDelHandler

  beforeEach(() => {
    blog = {
      title: 'There is no longer any such thing as Computer Security',
      author: 'Jeff Atwood',
      url: 'https://blog.codinghorror.com/there-is-no-longer-any-such-thing-as-computer-security/',
      likes: 6
    }

    mockLikeHandler = jest.fn()
    mockDelHandler = jest.fn()

    blogComponent = shallow(
      <Blog
        blog={blog}
        currentUser='testuser'
        likeButtonHandler={mockLikeHandler}
        delButtonHandler={mockDelHandler}
      />
    )
  })

  it('only show title and author at first', () => {
    const titleDiv = blogComponent.find('.blog-title')
    const infoBoxDiv = blogComponent.find('.blog-info-box')

    expect(titleDiv.text()).toContain(`${blog.title} by ${blog.author}`)
    expect(infoBoxDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('shows info after click', () => {
    const titleDiv = blogComponent.find('.blog-title')
    titleDiv.simulate('click')

    const infoBoxDiv = blogComponent.find('.blog-info-box')
    expect(infoBoxDiv.getElement().props.style).toEqual({ display: '' })
  })
})