import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs}) => (
  <div>
    <h2>blogs</h2>
    <ul>
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog}/>
      )}
    </ul>
  </div>
)

export default BlogList