const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
  {
    author: "Bran",
    likes : "69",
    title : "Testing",
    url : "https://www.bbkx.live"
  },
  {
    author: "Anonymous",
    likes : "99",
    title : "Who are you?",
    url : "https://www.facebook.com"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, notesInDb, usersInDb
}