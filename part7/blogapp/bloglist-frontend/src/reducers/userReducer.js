import  { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import userService from '../services/user'

const baseUrl = '/api/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initUser(state, action) {
      return action.payload
    }
  }
})

export const { initUser } = userSlice.actions

export const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, {
      username, password
    })
    return response.data
  } catch(exception) {
    console.log(exception.message)
  }

}

export const saveToLocal = user => {
  userService.setUser(user)
}


export const logout = () => {
  userService.clearUser()
}

export default userSlice.reducer