import React, { useState, useImperativeHandle } from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, refs) => {
  const blogs = props.blogs
  const setBlogs = props.setBlogs
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
        toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        <p></p>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs}/>)
        }
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable