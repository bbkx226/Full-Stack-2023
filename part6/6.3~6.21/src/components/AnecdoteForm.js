import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const setNotification = async (content, duration) => {
        await props.newNotification(content)
        setTimeout(async () => {
            await props.hideNotification()
        }, duration*1000)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const content = event.target.blog.value
        event.target.blog.value = ''
        props.createAnecdote({content, votes: 0})
        setNotification(`Anecdotes ${content} have successfully added`, 5)
    }
    
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
            <div>
                <input name='blog'/>
            </div>
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
    return {
      newNotification: value => {
        dispatch({type: 'notification/newNotification', payload: value})
      },
      hideNotification: () => {
        dispatch({type: 'notification/hideNotification'})
      },
      createAnecdote: value => {
        dispatch(createAnecdote(value))
      }
    }
  }
  
export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)