const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  const reducer = (sumOfLikes, blog) => {
    if (typeof(blog.likes) !== 'undefined') {
      return sumOfLikes + blog.likes
    } else {
      throw 'Item in array has no likes field'
    }
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favoriteBlog, blog) => {
    if (typeof(blog.likes) !== 'undefined') {
      blog = {
        'author': blog.author,
        'likes': blog.likes,
        'title': blog.title
      }

      return blog.likes > favoriteBlog.likes ? blog : favoriteBlog
    }
  }

  return blogs.length === 0 ? undefined : blogs.reduce(reducer, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}