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

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
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

  // Empties login info from localStorage and removes user
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
    dispatch(
      create({
        text: `Logged out succesfully`,
        color: 'grey',
      })
    )
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }

  // Reference to Togglable
  const blogFormRef = useRef()
  // Closes blog creation form when new blog is submitted using blogFormRef
  const handleCreateNewBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

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

    // Adds new blogs to redux
    const addBlogRedux = async (blogObject) => {
      try {
        blogService.create(blogObject)
        .then(result => {
          dispatch(createNewBlog(result))
        })        
      } catch (error) {
        if (error.response && error.response.status === 400) {
          dispatch(
            create({
              text: 'Error, bad request',
              color: 'red',
            })
          )
          setTimeout(() => {
            dispatch(remove())
          }, 5000)
        }
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

      {user && (
        <div>
          <h2>blogs</h2>
          <p
            style={{
              backgroundColor: 'green',
              padding: '10px',
              color: 'white',
            }}
          >
            Remember this is a new branch and needs to be merged if it works
          </p>{' '}
          {
            <p>
              {user.name} logged in <Logoutbutton onLogout={handleLogout} />
            </p>
          }


          <Togglable buttonLabel="create new blog redux" ref={blogFormRef}>
            <CreateBlogFormRedux
              handleCreateNewBlog={handleCreateNewBlog}
              blogs={blogsFromRedux}
              addBlogRedux={addBlogRedux}
            />
          </Togglable>

          {blogsFromRedux
            .map((blog) => (
              <BlogRedux
                key={blog.id}
                blog={blog}
                blogs={blogsFromRedux}
              />
            ))}

        </div>
      )}
    </div>
  )
}

export default App
