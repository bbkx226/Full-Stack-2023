import React from 'react'
import './notification.css'

const Notification = ({ message, state }) => {
    if (message === null) {
      return null
    }
    return (
      <div className={state}>
        {message}
      </div>
    )
  }

export default Notification