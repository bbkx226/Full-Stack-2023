import React from 'react'
import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

const User = ({ user }) => {
    return (
        <tr>
        <td>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
    </tr>
    )
}

const UserDetail = ({ user }) => {
    const Blog = ({ blog }) => (
        <div>
            <ul>
                <li>
                    {blog.title} by {blog.author}
                </li>
            </ul>
        </div>
    )
    if (user === undefined) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

export { User, UserDetail }