import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logoutbutton from './components/LogoutButton'
import CreateBlogForm from './components/CreateBlogForm'
import CreateBlogFormRedux from './components/CreateBlogFormRedux'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { create, remove } from './reducers/NotificationSlice'
import { setAllBlogs, createNewBlog } from './reducers/BlogsSlice'
import NotificationMessage from './components/NotificationMessage'
import Reduxtest from './components/Reduxtest'
import BlogRedux from './components/BlogRedux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogsFromRedux = useSelector((state) => state.blogs)

  // Retrieves blogs on the first page load and puts them in useState
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Retrieves blogs on the first page load and puts them in redux
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setAllBlogs(blogs)))
  }, [])

  const reduxBlogs = useSelector((state) => state.blogs)

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
        color: 'grey',
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
            color: 'red',
          })
        )
        setTimeout(() => {
          dispatch(remove())
        }, 5000)
        setBlogs(blogs.filter((b) => b.id !== id))
      })
  }

  // Adds new blogs to useState
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
            color: 'red',
          })
        )
        setTimeout(() => {
          dispatch(remove())
        }, 5000)
      }
    }
  }

    // Adds new blogs to redux
    const addBlogRedux = async (blogObject) => {
      try {
        dispatch(createNewBlog(blogObject))
        await blogService.create(blogObject)
  
        // const blogs = await blogService.getAll()
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
          
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm
              handleCreateNewBlog={handleCreateNewBlog}
              blogs={blogs}
              setBlogs={setBlogs}
              addBlog={addBlog}
            />
          </Togglable>

          <Togglable buttonLabel="create new blog redux" ref={blogFormRef}>
            <CreateBlogFormRedux
              handleCreateNewBlog={handleCreateNewBlog}
              blogs={blogs}
              setBlogs={setBlogs}
              addBlogRedux={addBlogRedux}
            />
          </Togglable>

          {/* {blogs
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
            ))} */}

          {blogsFromRedux
            // .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <BlogRedux
                key={blog.id}
                blog={blog}
                // blogs={blogsFromRedux}
                // setBlogs={setBlogs}
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
