const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, createUserAndAuthenticate } = require('./test_util')
let authHeader = ''

beforeAll(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  // This will be used whenever authentication is required
  authHeader = await createUserAndAuthenticate('exer', 'Erin Example', 'notsosecret')
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

  test('return HTTP 401 when no auth header is present', async () => {
    const newBlog = {
      'title': 'APIs should not be copyrightable',
      'author': 'Martin Fowler'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'missing token' })
  })
})

describe('delete blog', () => {
  test('requires token to be set', async () => {
    const allBlogsBeforeDelete = await blogsInDb()

    const blogToDelete = allBlogsBeforeDelete[0]
    const blogIdToDelete = blogToDelete._id

    const result = await api
      .delete(`/api/blogs/${blogIdToDelete}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'missing token' })
  })

  test('deletes blog', async () => {
    // Add a blog for us to delete
    const newBlog = {
      'title': 'What does Stack Overflow want to be when it grows up?',
      'author': 'Jeff Atwood',
      'url': 'https://blog.codinghorror.com/what-does-stack-overflow-want-to-be-when-it-grows-up/',
      'likes': 0
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogsBeforeDelete = await blogsInDb()

    const blogIdToDelete = response.body._id
    const blogTitleToDelete = response.body.title

    await api
      .delete(`/api/blogs/${blogIdToDelete}`)
      .set('Authorization', authHeader)
      .expect(204)

    const allBlogsAfterDelete = await blogsInDb()

    const titlesAfterDelete = allBlogsAfterDelete.map(blog => blog.title)

    expect(titlesAfterDelete).not.toContain(blogTitleToDelete)
    expect(allBlogsBeforeDelete.length).toBe(allBlogsAfterDelete.length+1)
  })

  test('does not let you delete blogs added by others', async () => {
    const differentAuthHeader = await createUserAndAuthenticate('rex', 'Rex Mundi', 'king')

    const newBlog = {
      'title': 'There is no longer any such thing as Computer Security',
      'author': 'Jeff Atwood',
      'url': 'https://blog.codinghorror.com/there-is-no-longer-any-such-thing-as-computer-security/',
      'likes': 0
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogIdToDelete = response.body._id
    const blogTitleToDelete = response.body.title

    const allBlogsBeforeDelete = await blogsInDb()

    const expectedDeleteFailureResponse = await api
      .delete(`/api/blogs/${blogIdToDelete}`)
      .set('Authorization', differentAuthHeader)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const allBlogsAfterDelete = await blogsInDb()
    const titlesAfterDelete = allBlogsAfterDelete.map(blog => blog.title)

    expect(expectedDeleteFailureResponse.body).toEqual({ error: 'unauthorized to remove blog' })
    expect(titlesAfterDelete).toContain(blogTitleToDelete)
    expect(allBlogsBeforeDelete.length).toBe(allBlogsAfterDelete.length)
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