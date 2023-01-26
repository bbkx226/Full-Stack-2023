import { useEffect } from 'react'
import { connect } from 'react-redux'
import { login, saveToLocal } from '../reducers/userReducer'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { initUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {

  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const dispatch = useDispatch()

  const setNotification = async (content) => {
    await props.newNotification(content)
  }

  const notify = (message, type='info') => {
    setNotification({ message, type })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      props.hideNotification(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await login(username.value, password.value)
      dispatch(initUser(user))
      saveToLocal(user)
      notify('Welcome back~')
    } catch(exception) {
      notify('Wrong username or password.', 'error')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>username:</Form.Label>
          <Form.Control placeholder="Enter username" {...username}/>
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password:</Form.Label>
          <Form.Control placeholder="Password" {...password}/>
        </Form.Group>
        <Button variant="primary" id="login-button" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newNotification: value => {
      dispatch({ type: 'notification/newNotification', payload: value })
    },
    hideNotification: () => {
      dispatch({ type: 'notification/hideNotification' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)