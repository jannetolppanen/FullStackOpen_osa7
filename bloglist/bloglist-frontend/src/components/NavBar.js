import { Link } from 'react-router-dom'
import LoginInformation from './LoginInformation'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'


export default function NavBar() {
  const padding = {
    padding: '10px',
  }
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/blogs" style={padding}>
            blogs
          </Link>
          <Link to="/users" style={padding}>
            users
          </Link>
          <LoginInformation />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}
