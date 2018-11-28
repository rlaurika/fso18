import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, likeButtonHandler}) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog
        key={blog._id}
        blog={blog}
        likeButtonHandler={likeButtonHandler(blog._id)}/>
    )}
  </div>
)

export default BlogList