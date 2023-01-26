import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  }
  return (
    <tr>
    <div style={style} className='blog'>
      <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
      --- {blog.author}
    </div>
    </tr>
  )
}

export default Blog