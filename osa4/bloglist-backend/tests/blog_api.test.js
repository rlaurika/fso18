const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_util')
let authHeader = ''

beforeAll(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  // Create a test user for tests that require credentials
  const newUser = {
    username: 'exer',
    name: 'Erin Example',
    adult: true,
    password: 'notsosecret'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const loginCreds = {
    'username': 'exer',
    'password': 'notsosecret'
  }

  const loginResponse = await api
    .post('/api/login')
    .set('content-type', 'application/json')
    .send(loginCreds)

  // This will be used whenever authentication is required
  authHeader = 'Bearer '+loginResponse.body.token
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
    const blogs = await blogsInDb()

    expect(response.body.length).toBe(blogs.length)
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
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await blogsInDb()

    const titles = allBlogs.map(blog => blog.title)

    expect(titles).toContain('Why Software Is Eating the World')
  })

  test('increments number of blogs by one', async () => {
    const newBlog = {
      'title': 'A Cherry Picker\'s Guide to Doctor Who',
      'author': 'Martin Fowler',
      'url': 'https://martinfowler.com/articles/doctor-who.html',
      'likes': 0
    }

    const blogsBeforeAdd = await blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdd = await blogsInDb()

    expect(blogsAfterAdd.length).toBe(blogsBeforeAdd.length + 1)
  })

  test('adds the likes field if it is missing', async () => {
    const newBlog = {
      'title': 'APIs should not be copyrightable',
      'author': 'Martin Fowler',
      'url': 'https://martinfowler.com/articles/copyright-api.html'
    }

    const result = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBeDefined()
    expect(result.body.likes).toBe(0)
  })

  test('returns HTTP 400 when no title is given in request', async () => {
    const newBlog = {
      'author': 'Martin Fowler',
      'url': 'https://martinfowler.com/articles/copyright-api.html'
    }

    const result = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'title field is mandatory' })
  })

  test('returns HTTP 400 when no URL is given in request', async () => {
    const newBlog = {
      'title': 'APIs should not be copyrightable',
      'author': 'Martin Fowler'
    }

    const result = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'url field is mandatory' })
  })
})

describe('delete blog', () => {
  test('deletes blog', async () => {
    const allBlogsBeforeDelete = await blogsInDb()

    const blogToDelete = allBlogsBeforeDelete[0]
    const blogIdToDelete = blogToDelete._id
    const blogTitleToDelete = blogToDelete.title

    await api
      .delete(`/api/blogs/${blogIdToDelete}`)
      .expect(204)

    const allBlogsAfterDelete = await blogsInDb()

    const titlesAfterDelete = allBlogsAfterDelete.map(blog => blog.title)

    expect(titlesAfterDelete).not.toContain(blogTitleToDelete)
    expect(allBlogsBeforeDelete.length).toBe(allBlogsAfterDelete.length+1)
  })
})

describe('update blog', () => {
  test('updates number of likes', async () => {
    const blogsBeforeUpdate = await blogsInDb()

    const blogToUpdate = blogsBeforeUpdate[0]

    const blogUpdate = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 15,
    }

    const updatedBlogFromApi = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blogUpdate)
      .expect(200)

    const blogsAfterUpdate = await blogsInDb()

    const updatedBlogFromDb = blogsAfterUpdate[0]

    expect(updatedBlogFromApi.body.likes).toBe(15)
    expect(updatedBlogFromDb.likes).toBe(15)
  })

  test('does not change total number of blogs', async () => {
    const blogsBeforeUpdate = await blogsInDb()

    const blogToUpdate = blogsBeforeUpdate[1]

    const blogUpdate = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 30,
    }

    await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blogUpdate)
      .expect(200)

    const blogsAfterUpdate = await blogsInDb()

    expect(blogsBeforeUpdate.length).toBe(blogsAfterUpdate.length)
  })

  test('return 400 on bad id', async () => {
    const blogsBeforeUpdate = await blogsInDb()

    const blogToUpdate = blogsBeforeUpdate[1]

    const blogUpdate = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 30,
    }

    await api
      .put('/api/blogs/5bbce02555')
      .send(blogUpdate)
      .expect(400)
  })
})

afterAll(() => {
  server.close()
})