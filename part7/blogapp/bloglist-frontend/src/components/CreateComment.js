import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const CreateComment = (props) => {
    const blog = props.blog
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

    const handleSubmit = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        try {
            dispatch(addComment(blog, comment))
            notify(`a new comment for ${blog.title}, ${comment}`)
        } catch (exception) {
            notify(exception.message)
        }

    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input
                id='comment'
                placeholder='add any comments'
            />
            <button id='create-butto' type='submit'>
                create
            </button>
        </form>
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
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateComment)