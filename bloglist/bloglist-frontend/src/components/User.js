import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)

  // Find the exact user
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
