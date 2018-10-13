const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogWithoutLikesField = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    __v: 0
  }
]

const lotsOfBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of a bigger list is calculated correctly', () => {
    expect(listHelper.totalLikes(lotsOfBlogs)).toBe(36)
  })

  test('function throws an error when no likes field in array item', () => {
    const incorrectCall = () => {
      listHelper.totalLikes(blogWithoutLikesField)
    }
    expect(incorrectCall).toThrowError('Item in array has no likes field')
  })
})

describe('favorite blog', () => {
  test('from a long list of blogs is correct', () => {
    const correctFavoriteBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }

    expect(listHelper.favoriteBlog(lotsOfBlogs)).toEqual(correctFavoriteBlog)
  })

  test('is undefined when no likes fields are found', () => {
    expect(listHelper.favoriteBlog(blogWithoutLikesField)).toBe(undefined)
  })

  test('is undefined for an empty list', () => {
    expect(listHelper.favoriteBlog([])).toBe(undefined)
  })

  test('in a list of one blog is that one blog', () => {
    const correctFavoriteBlog = {
      'title': listWithOneBlog[0].title,
      'author': listWithOneBlog[0].author,
      'likes': listWithOneBlog[0].likes
    }
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(correctFavoriteBlog)
  })
})

describe('most blogs', () => {
  test('in a long list of blogs is determined correctly', () => {
    const correctAuthor = {
      'author': 'Robert C. Martin',
      'blogs': 3
    }

    expect(listHelper.mostBlogs(lotsOfBlogs)).toEqual(correctAuthor)
  })

  test('of a list of one blog is correct', () => {
    const correctAuthor = {
      'author': 'Edsger W. Dijkstra',
      'blogs': 1
    }

    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(correctAuthor)
  })

  test('of an empty list is undefined', () => {
    expect(listHelper.mostBlogs([])).toBe(undefined)
  })
})