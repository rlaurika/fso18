const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// Add new blog
blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const token = request.token

    if (token === null) {
      return response.status(401).json({ error: 'missing token' })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' })
    }

    if (typeof(body.title) === 'undefined') {
      return response.status(400).json({ error: 'title field is mandatory' })
    }

    if (typeof(body.url) === 'undefined') {
      return response.status(400).json({ error: 'url field is mandatory' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } catch (exception) {
    console.log(exception.name+': '+exception.message)

    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      response.status(500).json({ error: 'unexpected error' })
    }
  }
})

// Delete blog by id
blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

// Update blog by id
blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body

    const blog = {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog)
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter