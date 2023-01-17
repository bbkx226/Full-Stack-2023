import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable  from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [stateMessage, setStateMessage] = useState('')
  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(() => {
        console.log(blogObject)
        console.log(blogs)
        blogs.concat(blogObject)
        setBlogs(blogs)
        window.location.reload(false)
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setStateMessage('good')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setStateMessage('error')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setStateMessage('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id='login' type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" blogs={blogs} ref={blogFormRef} setBlogs={setBlogs}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
    )
  }

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs( blogs.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {
      getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} state={stateMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{`${user.name} logged in`}<button onClick={handleLogout}>logout</button></p>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App
