import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ newBlog, createNewBlog, handleNewBlogFieldChange }) => {
  return (
    <form method="post" onSubmit={createNewBlog}>
      <h2>create new</h2>
      <div>
        <label htmlFor="newBlogTitle">Title: </label>
        <input
          type="text"
          id="newBlogTitle"
          name="newBlogTitle"
          value={newBlog.title}
          onChange={handleNewBlogFieldChange}>
        </input>
      </div>
      <div>
        <label htmlFor="newBlogAuthor">Author: </label>
        <input
          type="text"
          id="newBlogAuthor"
          name="newBlogAuthor"
          value={newBlog.author}
          onChange={handleNewBlogFieldChange}>
        </input>
      </div>
      <div>
        <label htmlFor="newBlogURL">URL: </label>
        <input
          type="text"
          id="newBlogURL"
          name="newBlogURL"
          value={newBlog.url}
          onChange={handleNewBlogFieldChange}>
        </input>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  )
}

NewBlogForm.propTypes = {
  newBlog: PropTypes.object.isRequired,
  createNewBlog: PropTypes.func.isRequired,
  handleNewBlogFieldChange: PropTypes.func.isRequired
}

export default NewBlogForm