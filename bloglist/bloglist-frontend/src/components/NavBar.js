import { Link } from "react-router-dom"
import LoginInformation from "./LoginInformation"

const NavBar = () => {

  const padding = {
    padding: 5,
  }

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#CEFDFF",
    margin: "0px 0px 15px 0px"



  }
  return (
    <div style={containerStyle}>
      <Link to="/blogs">
        blogs
      </Link>
      <Link to="/users">
        users
      </Link>
      <LoginInformation />
    </div>
  )
}

export default NavBar