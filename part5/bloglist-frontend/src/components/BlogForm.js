import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleTitleChange = (event) => setTitle(event.target.value)
    const handleAuthorChange = (event) => setAuthor(event.target.value)
    const handleUrlChange = (event) => setUrl(event.target.value)

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          title,
          author,
          url,
          likes: 0
        })
        setTitle('')
        setAuthor('')
        setUrl('')
      }

    return(
        <div>
        <h1>create new</h1>
        <form onSubmit={addBlog}>
        <div>
            title: <input id="title" type="text" value={title} name="title" onChange={handleTitleChange}/>
        </div>
        <div>
            author: <input id="author" type="text" value={author} name="author" onChange={handleAuthorChange}/>
        </div>
        <div>
            url: <input id="url" type="text" value={url}  name="url" onChange={handleUrlChange}/>
        </div>
        <button id="submit" type="submit">create</button>
        </form>
        </div>
    )
}

export default BlogForm