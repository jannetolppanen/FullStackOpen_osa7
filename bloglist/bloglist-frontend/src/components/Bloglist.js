import Togglable from "./Togglable"
import Logoutbutton from "./LogoutButton"
import CreateBlogFormRedux from "./CreateBlogFormRedux"
import BlogRedux from "./BlogRedux"
import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react"
import { logout } from "../reducers/UserSlice"
import { create, remove } from "../reducers/NotificationSlice"


const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector((state) => state.user)
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
              <CreateBlogFormRedux
                // handleCreateNewBlog={handleCreateNewBlog}
                blogs={blogs}
                // addBlogRedux={addBlogRedux}
              />
            </Togglable>
            {blogs.map((blog) => (
              <BlogRedux key={blog.id} blog={blog} blogs={blogs} />
            ))}
          </div>
    </div>
  )
}

export default Bloglist
