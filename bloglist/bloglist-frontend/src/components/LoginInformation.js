import { useSelector, useDispatch } from "react-redux"
import Logoutbutton from "./LogoutButton"
import { logout } from "../reducers/LoginSlice"
import { create, remove } from "../reducers/NotificationSlice"

const LoginInformation = () => {
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

  if (!user) {
    return null
  }

  return (
    <div>
      {
        <p>
          {user.name} logged in <Logoutbutton onLogout={handleLogout} />
        </p>
      }
    </div>
  )
}

export default LoginInformation
