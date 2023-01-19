import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'

const AnecdoteList = (props) => {
    const anecdotes = () => {
      if (props.filters === null) {
        return props.anecdotes
      }
      return props.anecdotes.filter(anecdote => anecdote.content.includes(props.filters))
    }

    const setNotification = (content) => {
      props.newNotification(content)
    }



    const vote = (content, id) => {
      props.voteAnecdote(id)
      setNotification(`you voted ' ${content} '`, 5)
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
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes().map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.content, anecdote.id)}>vote</button>
            </div>
        </div>
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filters: state.filters,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newNotification: value => {
      dispatch({type: 'notification/newNotification', payload: value})
    },
    hideNotification: () => {
      dispatch({type: 'notification/hideNotification', payload: null})
    },
    voteAnecdote: value => {
      dispatch({type: 'anecdote/voteAnecdote', payload: value})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)