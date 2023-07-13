import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Logoutbutton from './components/LogoutButton'
import CreateBlogFormRedux from './components/CreateBlogFormRedux'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { create, remove } from './reducers/NotificationSlice'
import { login, logout } from './reducers/UserSlice'
import { setAllBlogs, createNewBlog } from './reducers/BlogsSlice'
import NotificationMessage from './components/NotificationMessage'
import BlogRedux from './components/BlogRedux'
import Users from './components/Users'
import Bloglist from './components/Bloglist'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogsFromRedux = useSelector((state) => state.blogs)

  // Retrieves blogs on the first page load and puts them in redux
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setAllBlogs(blogs)))
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
      <div>

        <NotificationMessage />

        {!user && (
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )}

        {user && ( <Bloglist />  )}
      </div>
  )
}

export default App
