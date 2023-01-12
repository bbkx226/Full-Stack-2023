const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.length === 0 ? {} : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? {} : blogs.reduce((max, blog) => blog.likes > max ? blog.likes : max, blogs[0].likes)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let author = blogs.reduce((count, blog) => {
            count[blog.author] = (count[blog.author] || 0) + 1
            return count
        }, {})
        let max = Math.max(...Object.values(author))
        let most = Object.keys(author).filter(position => author[position] === max)
        return {
            author: most[0],
            blogs: max
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let likes = blogs.reduce((count, blog) => {
            count[blog.author] = (count[blog.author] || 0) + blog.likes
            return count
        }, {})
        let max = Math.max(...Object.values(likes))
        let most = Object.keys(likes).filter(position => likes[position] === max)
        return {
            author: most[0],
            likes: max
        }
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}