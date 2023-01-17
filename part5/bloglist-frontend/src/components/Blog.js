import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeChange = async (blog) => {
    await blogService.update(blog.id, {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
    })
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)

      let blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author} <button className='button' onClick={toggleVisibility}>view</button>
      </div>

      <div className='blogAll' style={showWhenVisible}>
        <div className='blog'>{blog.title} - {blog.author}</div><button onClick={toggleVisibility}>hide</button><br/>
        {blog.url}<br/>
        likes <div id='checkLike'>{blog.likes}</div> <button className='likes' onClick={() => handleLikeChange(blog)}>like</button><br/>
        <button id= 'remove' onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  )}

export default Blog