const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
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

beforeAll(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get all blogs', () => {
  test('returns json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the right number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })
})

describe('add new blog', () => {
  test('adds new blog', async () => {
    const newBlog = {
      'title': 'Why Software Is Eating the World',
      'author': 'Marc Andreessen',
      'url': 'https://a16z.com/2016/08/20/why-software-is-eating-the-world/',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await api.get('/api/blogs')

    const titles = allBlogs.body.map(blog => blog.title)

    expect(titles).toContain('Why Software Is Eating the World')
  })

  test('increments number of blogs by one', async () => {
    const newBlog = {
      'title': 'A Cherry Picker\'s Guide to Doctor Who',
      'author': 'Martin Fowler',
      'url': 'https://martinfowler.com/articles/doctor-who.html',
      'likes': 0
    }

    const blogsBeforeAdd = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdd = await api.get('/api/blogs')

    const blogTitles = blogsAfterAdd.body.map(blog => blog.title)

    expect(blogTitles).toContain('A Cherry Picker\'s Guide to Doctor Who')
    expect(blogsAfterAdd.body.length).toBe(blogsBeforeAdd.body.length + 1)
  })

  test('adds the likes field if it is missing', async () => {
    const newBlog = {
      'title': 'APIs should not be copyrightable',
      'author': 'Martin Fowler',
      'url': 'https://martinfowler.com/articles/copyright-api.html'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBeDefined()
    expect(result.body.likes).toBe(0)
  })
})

afterAll(() => {
  server.close()
})