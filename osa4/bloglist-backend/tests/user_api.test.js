const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { initialUsers, usersInDb } = require('./test_util')

beforeAll(async () => {
  await User.deleteMany({})

  const userObjects = initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('create new user', () => {
  test('creates new user', async () => {
    const newUser = {
      username: 'ccracker',
      name: 'Carl Cracker',
      adult: true,
      password: 'highlysecret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterAdd = await usersInDb()
    const usernamesAfterAdd = usersAfterAdd.map(user => user.username)
    expect(usernamesAfterAdd).toContain(newUser.username)
  })

  test('rejects user if password is too short', async () => {
    const newUser = {
      username: 'jjest',
      name: 'Jessie Jest',
      adult: true,
      password: 'jj'
    }

    const usersBeforeAdd = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterAdd = await usersInDb()

    expect(usersAfterAdd.length).toBe(usersBeforeAdd.length)
    expect(response.body).toEqual(
      { error: 'password given is too short (must be at least 3 chars long)' }
    )
  })

  test('reject user if username exists already', async () => {
    const newUser = {
      username: 'hhacker',
      name: 'Harry Hacker',
      adult: false,
      password: 'extrasecret'
    }

    const usersBeforeAdd = await usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)

    const usersAfterAdd = await usersInDb()

    expect(usersBeforeAdd.length).toBe(usersAfterAdd.length)
    expect(response.body).toEqual(
      { error: 'a user with that username already exists' }
    )
  })

  test('sets adult flag as true when not specified in request', async () => {
    const newUser = {
      username: 'henry',
      name: 'Henry Hacker',
      password: 'ludicrouslysecret'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.adult).toBe(true)
  })
})

describe('get all users', () => {
  test('gets a list of users', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usernames = response.body.map(user => user.username)
    expect(usernames).toContain('ddev')
  })
})

describe('user login', () => {
  test('works for valid user', async () => {
    const login = {
      username: 'ddev',
      password: 'supersecret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(login)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(Object.keys(loginResponse.body)).toContainEqual([ 'token', 'username', 'user' ])
  })

  test('denies invalid user', async () => {
    const login = {
      username: 'ddev',
      password: 'supersecret'
    }

    const loginResponse = await api
      .post('/api/login')
      .send(login)
      .expect(401)

    expect(loginResponse.body).toContainEqual({ error: 'invalid username or password' })
  })
})

afterAll(() => {
  server.close()
})