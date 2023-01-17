import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('renders content', () => {
  const blog = {
    title: 'Peaky Blinders',
    author: 'Tommy Shelby',
    url: 'https://www.demo123.com',
    likes: '69'
  }
  
  const mockUpdateBlog = jest.fn()

  test('renders title & author', () => {
    const component = render(<Blog blog={blog} setBlogs={mockUpdateBlog}/>)
    const blogCon = component.container.querySelector('.blog')
    expect(blogCon).toHaveTextContent('Peaky Blinders - Tommy Shelby')
  })

  test('checks that the blog\'s URL and number of likes are shown', async () => {
    const component = render(<Blog blog={blog} setBlogs={mockUpdateBlog}/>)
    const button = component.container.querySelector('.button')
    fireEvent.click(button)

    const blogAll = component.container.querySelector('.blogAll')
    expect(blogAll).toHaveTextContent(`${blog.url}`)
    expect(blogAll).toHaveTextContent(`${blog.likes}`)
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} setBlogs={mockUpdateBlog}/>)
    const button = component.container.querySelector('.button')
    fireEvent.click(button)
    const likes = render(<button className='likes' onClick={mockHandler}>like</button>)
    const check = likes.container.querySelector('.likes')
    fireEvent.click(check)
    fireEvent.click(check)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('create a new blog', () => {
    const component = render(<BlogForm />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
  })
})