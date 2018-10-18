const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    let blog = new Blog(request.body)

    if (typeof(blog.title) === 'undefined') {
      response.status(400).json({ error: 'title field is mandatory' })
    }

    if (typeof(blog.url) === 'undefined') {
      response.status(400).json({ error: 'url field is mandatory' })
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

module.exports = blogsRouter