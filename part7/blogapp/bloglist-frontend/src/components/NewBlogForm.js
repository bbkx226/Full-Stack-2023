import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = (props) => {
  const blogFormRef = props.blogFormRef
  const setNotification = async (content) => {
    await props.newNotification(content)
  }

  const notify = (message, type='info') => {
    setNotification({ message, type })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const title =event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    if (title === '' || author === '' || url === '') {
      notify('creating a blog failed ', 'alert')
      return
    }

    event.target.url.value = ''
    event.target.author.value = ''
    event.target.title.value = ''

    const blogToCreate = {
      title,
      author,
      url,
      likes: 0,
      comments: []
    }

    props.createBlog(blogToCreate)
    blogFormRef.current.toggleVisibility()
    notify(`a new blog '${blogToCreate.title}' by ${blogToCreate.author} added`)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.hideNotification(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  })

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>title:</Form.Label>
          <Form.Control placeholder="Enter title" id='title' />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>author:</Form.Label>
          <Form.Control placeholder="Enter author" id='author'/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url:</Form.Label>
          <Form.Control placeholder="Enter url" id='url'/>
        </Form.Group>
        <Button variant="primary" id="login-button" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    newNotification: value => {
      dispatch({ type: 'notification/newNotification', payload: value })
    },
    hideNotification: () => {
      dispatch({ type: 'notification/hideNotification' })
    },
    createBlog: value => {
      dispatch(createBlog(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewBlogForm)