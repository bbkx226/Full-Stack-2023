require('express-async-errors')
require('dotenv').config()
const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
  const books = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(books)

})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title : body.title,
    url : body.url,
    author: body.author,
    likes : body.likes || 0,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

notesRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

notesRouter.put('/:id', async (request, response, next) => {
  if (await Blog.findById(request.params.id)){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const body = request.body

    const blog = {
      title : body.title,
      url : body.url,
      author: body.author,
      likes : body.likes || 0,
      user: user._id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, blog, { new: true }
    )
    response.json(updatedBlog.toJSON())
  }

  response.status(404).end()
})

notesRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const deleteBlog = await Blog.findById(request.params.id)
  
  if (deleteBlog.user._id.toString() === user._id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized'})
  }

})

module.exports = notesRouter