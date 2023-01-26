import  { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    }
  }
})

export const { newNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer