import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logoutbutton from './components/LogoutButton'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { create, remove } from './reducers/NotificationSlice'
import NotificationMessage from './components/NotificationMessage'
import Reduxtest from './components/Reduxtest'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  // Retrieves blogs on the first page load
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Checks if localStorage already has login info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // Empties login info from localStorage and removes user
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(
      create({
        text: `Logged out succesfully`,
        color: "grey"
    })
    )
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
    setUser(null)
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
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(
        create({
          text: `Logged in user ${username}`,
          color: "blue"
      })
      )
      setTimeout(() => {
        dispatch(remove())
      }, 5000)
    } catch (exception) {
      dispatch(
        create({
          text: 'wrong username or password',
          color: "red"
      })
      )
      setTimeout(() => {
        dispatch(remove())
      }, 5000)
    }
  }

  // Add like to blogpost with certain id
  const addLike = (id) => {
    const blogObject = blogs.find((b) => b.id === id)
    const changedBlog = { ...blogObject, likes: blogObject.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(() => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : changedBlog)))
      })
      .catch(() => {
        dispatch(
          create({
            text: 'Blog was already removed from server',
            color: "red"
        })
        )
        setTimeout(() => {
          dispatch(remove())
        }, 5000)
        setBlogs(blogs.filter((b) => b.id !== id))
      })
  }

  // Adds new blogs
  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch(
          create({
            text: 'Error, bad request',
            color: "red"
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
      {/* <Reduxtest /> */}
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
          {
            <p>
              {user.name} logged in <Logoutbutton onLogout={handleLogout} />
            </p>
          }

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm
              handleCreateNewBlog={handleCreateNewBlog}
              blogs={blogs}
              setBlogs={setBlogs}
              addBlog={addBlog}
            />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
                addLike={addLike}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
