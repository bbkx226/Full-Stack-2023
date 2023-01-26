import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { initUser } from '../reducers/userReducer'
import userService from '../services/user'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Menu = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setTimeout(() => {
          props.hideNotification(null)
        }, 5000)
        return () => {
          clearTimeout(timer)
        }
    })

    const setNotification = async (content) => {
        await props.newNotification(content)
      }

    const notify = (message, type='info') => {
    setNotification({ message, type })
    }

    const Navigation = styled.div`
    background: Bisque;
    padding: 0.75em;
    justify-content: center;
  `
    const Button = styled.a`
    display: inline-block;
    border-radius: 15px;
    padding: 0.5rem 0;
    margin: 0.5rem 1rem;
    width: 11rem;
    background: transparent;
    color: white;
    border: 2px solid white;
    text-align: center;
  `
    const Status = styled.div`
    position: absolute; 
    top: 0; 
    right: 0; 
    width: 1000px; 
    text-align:right;
  `
    const logout = () => {
        dispatch(initUser(null))
        userService.clearUser()
        notify('good bye!')
    }
  return (
    <div>
    <Navigation>
      <Button><Link to="/">Blogs</Link></Button>
      <Button><Link to="/users">Users</Link></Button>
      <Status>{props.user.name} logged in <button onClick={logout}>logout</button></Status>
    </Navigation>
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
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)