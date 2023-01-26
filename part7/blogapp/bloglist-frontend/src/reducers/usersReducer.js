import  { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initUsers(state, action) {
      return action.payload.sort((a, b) => b.blogs.length - a.blogs.length)
    }
  }
})

export const { initUsers } = usersSlice.actions

export const initializedLogin = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(initUsers(users))
    }
}

export default usersSlice.reducer