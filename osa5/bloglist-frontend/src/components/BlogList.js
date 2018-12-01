import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, likeButtonHandler}) => {
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog._id}
          blog={blog}
          likeButtonHandler={likeButtonHandler(blog._id)}
        />
      )}
    </div>
  )
}

export default BlogList