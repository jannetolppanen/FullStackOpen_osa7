import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
      username <p style={{ display: 'inline-block', color: 'grey' }}>admin</p>
      <input
        type="text"
        value={username}
        name="Username"
        id="username-form"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password <p style={{ display: 'inline-block', color: 'grey' }}>pass</p>
      <input
        type="password"
        value={password}
        id="password-form"
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id="login-button" type="submit">
      login
    </button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

export default LoginForm
