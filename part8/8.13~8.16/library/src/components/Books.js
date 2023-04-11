import { useQuery } from '@apollo/client'
import React from 'react'

import { ALL_BOOKS } from '../queries'

const Book = ({ book }) => (
  <tr>
    <td>{book.title}</td>
    <td>{book.author.name}</td>
    <td>{book.published}</td>
  </tr>
)

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books.map(book =>
              <Book key={book.title} book={book} />
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Books