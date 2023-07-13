import Togglable from "./Togglable"
import Logoutbutton from "./LogoutButton"
import CreateBlogForm from "./CreateBlogForm"
import Blog from "./Blog"
import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react"
import { logout } from "../reducers/LoginSlice"
import { create, remove } from "../reducers/NotificationSlice"


const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

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

  return (
    <div>
                <div>
            <h2>blogs</h2>
            {
              <p>
                {user.name} logged in <Logoutbutton onLogout={handleLogout} />
              </p>
            }
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <CreateBlogForm
                blogs={blogs}
              />
            </Togglable>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} blogs={blogs} />
            ))}
          </div>
    </div>
  )
}

export default Bloglist
