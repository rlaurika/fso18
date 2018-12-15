import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ doLogin, handleLoginFieldChange }) => {
  return (
    <form method="post" onSubmit={doLogin}>
      <h2>Login to the Bloglist</h2>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleLoginFieldChange}>
        </input>
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleLoginFieldChange}>
        </input>
      </div>
      <div>
        <button type="submit">log in</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  doLogin: PropTypes.func.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired
}

export default LoginForm