
import React, { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from "./components/Notification"

const Header = ({ setPage }) => (
  <div>
    <button onClick={() => setPage('authors')}>authors</button>
    <button onClick={() => setPage('books')}>books</button>
    <button onClick={() => setPage('add')}>add book</button>
  </div>
)

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)

  const notifyWith = (message, type = "success", timer = 3000) => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, timer)
  }

  return (
    <div>
      <Header setPage={setPage} />
      <Notification notification={notification} />
      <Authors show={page === 'authors'} notifyWith={notifyWith} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} notifyWith={notifyWith} />
    </div>
  )
}

export default App