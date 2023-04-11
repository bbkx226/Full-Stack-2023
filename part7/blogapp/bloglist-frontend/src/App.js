import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'

import Menu from './components/Menu'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { UserDetail } from './components/User'
import BlogDetails from './components/BlogDetails'

import userService from './services/user'
import { initUser } from './reducers/userReducer'
import { initializedBlogs } from './reducers/blogReducer'
import { initializedLogin } from './reducers/usersReducer'
import { useMatch, Routes, Route } from 'react-router-dom'

const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializedBlogs())
    dispatch(initializedLogin())
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(initUser(userFromStorage))
    }
  }, [])

  const blogFormRef = useRef()
  const userMatch = useMatch('/users/:id')
  const user = userMatch ? props.users.find(user => user.id === userMatch.params.id) : null
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? props.blogs.find(blog => blog.id === blogMatch.params.id) : null

  const Header = styled.h1`
    text-align: center;
    background: #CCBC9C;
    padding: 0.75em;
    justify-content: center;
  `
  const Test = () => { (<p>hello</p>) }

  return (
    <div>
      <Test />
      {props.user === null ?
      <div>
        <Notification />
        <LoginForm/>
      </div>
      :
      <div>
        <Menu />
        <Notification />
        <Header>Blog App</Header>
        <Togglable buttonLabel='create new' ref={blogFormRef}>
          <NewBlogForm
            blogFormRef={blogFormRef}
          />
        </Togglable>

        <Routes>
          <Route path="/users/:id" element={<UserDetail user={user} />} />
          <Route path="/users" element={<Users />}/>
          <Route path="/" element={
            <div>
              <Table striped bordered hover>
                <tbody>
                  {props.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog}/>
                  )}
                </tbody>
              </Table>
          </div>
          }/>
          <Route path="/blogs/:id" element={<BlogDetails blog={blog} user={props.user}/>} />
        </Routes>
      </div>
    }

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

export default connect(
  mapStateToProps
)(App)