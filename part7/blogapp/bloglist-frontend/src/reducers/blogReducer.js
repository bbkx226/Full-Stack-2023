import  { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes<b1.likes ? 1 : -1

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
        const id = action.payload.id
        const updatedBlog = state.find(x => String(x.id) === id)
        const changedBlog = {
          ...updatedBlog,
          likes: updatedBlog.likes+1
        }
        return state.map(x => x.id !== id ? x : changedBlog)
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlog(state, action) {
        return action.payload
    },
    deleteBlog(state, action) {
        return state.filter(blog => blog.id !== String(action.data))
    },
    commentBlog(state, action) {
      const id = action.payload.id
      const filterBlog = state.find(x => String(x.id) === id)
      const newBlog = {
        ...filterBlog,
        comments: action.payload.comments
      }
      return state.map(x => x.id !== id ? x : newBlog)
    }
  }
})

export const { likeBlog, appendBlog, setBlog, deleteBlog, commentBlog } = blogSlice.actions

export const initializedBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch(setBlog(blogs.sort(byLikes)))
    }
  }

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(deleteBlog(id))
    }
}

export const like = content => {
    return async dispatch => {
        const updatedBlog = await blogService.update(content.id, {
            'title': content.title,
            'author': content.author,
            'url': content.url,
            'likes': content.likes + 1,
            'comments': content.comments
         })
        dispatch(likeBlog(updatedBlog))
    }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const userComment = await blogService.update(blog.id, {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
      'comments': blog.comments.concat([comment])
    })
    dispatch(commentBlog(userComment))
  }
}

export default blogSlice.reducer