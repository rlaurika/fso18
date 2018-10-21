const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// Add new blog
blogsRouter.post('/', async (request, response) => {
  try {
    let blog = new Blog(request.body)

    if (typeof(blog.title) === 'undefined') {
      return response.status(400).json({ error: 'title field is mandatory' })
    }

    if (typeof(blog.url) === 'undefined') {
      return response.status(400).json({ error: 'url field is mandatory' })
    }

    if (typeof(blog.likes) === 'undefined') {
      blog = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: 0
      })
    }
    const result = await blog.save()

    response.status(201).json(result)
  } catch (exception) {
    response.status(500).json({ error: 'unexpected error' })
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

module.exports = blogsRouter