import Togglable from './Togglable'
// import Logoutbutton from "./LogoutButton"
import CreateBlogForm from './CreateBlogForm'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { logout } from '../reducers/LoginSlice'
import { create, remove } from '../reducers/NotificationSlice'
import { Link } from 'react-router-dom'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // Reference to Togglable
  const blogFormRef = useRef()

  return (
    <div>
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <CreateBlogForm blogs={blogs} />
        </Togglable>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Bloglist
