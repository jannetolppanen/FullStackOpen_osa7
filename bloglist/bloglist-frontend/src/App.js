import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { create, remove } from './reducers/NotificationSlice'
import { login, logout } from './reducers/LoginSlice'
import { setAllBlogs } from './reducers/BlogsSlice'
import { setUsers } from './reducers/UserSlice'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import Bloglist from './components/Bloglist'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import User from './components/User'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const padding = {
    padding: 5,
  }

  // Retrieves blogs on the first page load and puts them in redux
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setAllBlogs(blogs)))
    userService.getAll().then((users) => dispatch(setUsers(users)))
  }, [])

  // Checks if localStorage already has login info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(login(user))
    }
  }, [])

  // Login handler
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(login(user))
      setUsername('')
      setPassword('')
      dispatch(
        create({
          text: `Logged in user ${username}`,
          color: 'blue',
        })
      )
      setTimeout(() => {
        dispatch(remove())
      }, 5000)
    } catch (exception) {
      dispatch(
        create({
          text: 'wrong username or password',
          color: 'red',
        })
      )
      setTimeout(() => {
        dispatch(remove())
      }, 5000)
    }
  }

  return (
    <Router>
      <NotificationMessage />
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Routes>

        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/blogs" />
            ) : (
              <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            )
          }
        />

        <Route
          path="/blogs"
          element={user ? <Bloglist /> : <Navigate to="/" />}
        />

        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Router>
  )
}

export default App
