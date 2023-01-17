const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'superuser', passwordHash})

    await user.save()
  }, 100000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

describe('test without token authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', name: 'superuser', passwordHash})
    
    await api
      .post('/api/users')
      .send(user)
    
    await api
      .post('/api/login')
      .send(user)

    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  }, 100000)

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
    
  test('a specific blog is within the returned notes', async () => {
      const response = await api.get('/api/blogs')
      const title = response.body.map(r => r.title)
      expect(title).toContain('Testing')
  }, 100000)

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.notesInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  }, 100000)

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  }, 100000)

  
})

describe('test with token authentication', () => {
  let headers
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    const user = { username: 'bbkx', name: 'Brandon', password: '123'}
    await api
      .post('/api/users')
      .send(user)
      .expect(201)

    const result = 
      await api
        .post('/api/login')
        .send(user)
        .expect(200)
    headers = {'Authorization': `Bearer ${result.body.token}`}

  }, 100000)

  test('a valid blog can be added', async () => {
    const newBlog = {
      title : "I am Who I am",
      url : "https://www.instagram.com",
      author: "abc",
      likes : 123
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.notesInDb()
    expect(response).toHaveLength(helper.initialBlogs.length+1)

    const title = response.map(n => n.title)
    expect(title).toContain("I am Who I am")
  }, 100000)

  test('set likes to 0 if not exist', async () => {
    const newBlog = {
      title:"Amazon",
      author:"abcdefg",
      url:"http://www.twitter.com",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.notesInDb()
    const postedBlog = blogsAtEnd.find(blog => blog.title === "Amazon")
    expect(postedBlog.likes).toBe(0)
  }, 100000)

  test('blog without title or url will have status code 400 Bad Request', async () => {
    const newBlog = {
      author: "g8",
      likes : "69",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)

    const response = await helper.notesInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('update likes', async () => {
    const blog = {
        title: 'Testing',
        author: 'Bran',
        url: 'https://www.bbkx.live',
        likes: 69
    }

    const all = await helper.notesInDb()
    const blogToUpdate = all.find(x => x.title === blog.title)
    const updateBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes+1
    }
    await api
        .put(`/api/blogs/${updateBlog.id}`)
        .send(updateBlog)
        .set(headers)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
      const blogsAtEnd = await helper.notesInDb()
      const foundBlog = blogsAtEnd.find(blog => blog.likes === 70)
      console.log(foundBlog)
      expect(foundBlog.likes).toBe(70)

  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})