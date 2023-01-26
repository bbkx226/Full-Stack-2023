import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializedBlogs, like, removeBlog } from '../reducers/blogReducer'
import Comments from './Comments'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogDetails = (props) => {
  const blog = props.blog
  const user = props.user
  const own = blog.user && user.username=== blog.user.username
  const setNotification = async (content) => {
    await props.newNotification(content)
  }

  const notify = (message, type='info') => {
    setNotification({ message, type })
  }

  const handleLike = () => {
    props.like(blog)
    notify(`you liked '${blog.title}' by ${blog.author}`)
  }

  const remove = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)
    if (!ok) {
      return
    }
    props.removeBlog(blog.id)
    props.initializedBlogs()
    notify('The blog is deleted~')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.hideNotification(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  })

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  return (
    <Table>
      <tbody>
        <tr>
          <td><b>Title</b></td>
          <td>{blog.title}</td>
        </tr>
        <tr>
          <td><b>Url Link</b></td>
          <td><a href={blog.url}>{blog.url}</a></td>
        </tr>
        <tr>
          <td><b>Likes Owned</b></td>
          <td>{blog.likes} likes <button onClick={() => handleLike()}>like</button></td>
        </tr>
        <tr>
          <td><b>Added By</b></td>
          <td>{addedBy}</td>
        </tr>
        <tr>
          <td>
            Click to
            {own&&
              <Link to="/">
                <button onClick={() => remove()}>
                  remove
                </button>
              </Link>
            }
          </td>
          <td></td>
        </tr>
          <h3>Comments</h3>
          <Comments blog={blog} />
      </tbody>
    </Table>
  )
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      newNotification: value => {
        dispatch({ type: 'notification/newNotification', payload: value })
      },
      hideNotification: () => {
        dispatch({ type: 'notification/hideNotification' })
      },
      like: value => {
        dispatch(like(value))
      },
      removeBlog: value => {
        dispatch(removeBlog(value))
      },
      initializedBlogs: () => {
        dispatch(initializedBlogs())
      }
    }
  }

  export default connect(
    null,
    mapDispatchToProps
  )(BlogDetails)