import {createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const updatedAnecdote = state.find(x => String(x.id) === id)
      const changedAnecdote = {
        ...updatedAnecdote,
        votes: updatedAnecdote.votes+1
      }
      return state.map(x => x.id !== id ? x : changedAnecdote).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializedAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    await anecdoteService.createNew(content)
    dispatch(appendAnecdote(content))
  }
}

export default anecdoteSlice.reducer