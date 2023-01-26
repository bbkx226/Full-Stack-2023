import React from 'react'
import { connect } from 'react-redux'
import { User } from './User'
import { Link } from 'react-router-dom'
const Users = (props) => {
    if(!props.user){
        return null
    }

  return (
    <div>
        <Link to="/users"></Link>
        <h1>Users</h1>
        <p></p>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>blogs created</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user => <User key={user.id} user={user} />)}
            </tbody>
        </table>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      users: state.users,
      user: state.user,
    }
}

export default connect(
    mapStateToProps
)(Users)