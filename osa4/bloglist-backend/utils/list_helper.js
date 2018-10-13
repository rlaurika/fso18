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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const nameReducer = (authors, blog) => {
    if (blog.author in authors) {
      authors[blog.author]++
    } else {
      authors[blog.author] = 1
    }

    return authors
  }

  const authorBlogNumbers = blogs.reduce(nameReducer, {})

  const mostProlificAuthor = Object.keys(authorBlogNumbers)
    .reduce((currMostProlificAuthor, author) => {
      return authorBlogNumbers[author] > authorBlogNumbers[currMostProlificAuthor] ? author : currMostProlificAuthor
    })

  return { 'author': mostProlificAuthor, 'blogs': authorBlogNumbers[mostProlificAuthor] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const nameReducer = (authors, blog) => {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }

    return authors
  }

  const authorLikes = blogs.reduce(nameReducer, {})

  const mostLikedAuthor = Object.keys(authorLikes)
    .reduce((currMostLikedAuthor, author) => {
      return authorLikes[author] > authorLikes[currMostLikedAuthor] ? author : currMostLikedAuthor
    })

  return { 'author': mostLikedAuthor, 'likes': authorLikes[mostLikedAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}