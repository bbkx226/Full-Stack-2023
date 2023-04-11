import { useQuery } from '@apollo/client'
import React from 'react'

import { ALL_AUTHORS } from '../queries'
import EditBornyear from './EditBornyear'

const Author = ({ author }) => (
  <tr>
    <td>{author.name}</td>
    <td>{author.born}</td>
    <td>{author.bookCount}</td>
  </tr>
)


const Authors = ({ authors }) => (
  <div>
    <h2>authors</h2>
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>born</th>
          <th>books</th>
        </tr>
        {
          authors.map(author =>
            <Author key={author.id} author={author} />
          )
        }
      </tbody>
    </table>
  </div>
)


const AuthorView = ({ show, notifyWith }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <Authors authors={authors} />
      <EditBornyear authors={authors} notifyWith={notifyWith} />
    </div>
  )
}

export default AuthorView