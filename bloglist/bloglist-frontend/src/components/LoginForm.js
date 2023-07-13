import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'

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
      <p>admin / pass</p>
            <TextField
      label="username"
        type="text"
        value={username}
        name="Username"
        id="username-form"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <br/>
    <div>
      <TextField
      label="password"
        type="password"
        value={password}
        id="password-form"
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <Button variant="contained" color="primary" id="login-button" type="submit">
      login
    </Button>
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
