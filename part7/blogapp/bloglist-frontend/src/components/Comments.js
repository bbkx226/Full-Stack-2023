import React from 'react'
import Togglable from './Togglable'
import CreateComment from './CreateComment'

const Comment = ({ comment }) => {
  return (
    <div>
        <ul>
            <li>
                {comment}
            </li>
        </ul>
    </div>
  )
}

const Comments = ({ blog }) => {
  return (
    <div>
      <div>
        <Togglable buttonLabel='add comment'>
          <CreateComment blog={blog} />
        </Togglable>
      </div>
      <div>
        {blog.comments.map((comment, index) =>
          <Comment key={index} comment={comment}/>
        )}
      </div>
    </div>

  )
}

export default Comments