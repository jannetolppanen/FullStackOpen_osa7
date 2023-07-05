import React from 'react'
import { useSelector } from 'react-redux'

const NotificationMessage = () => {
  const notification = useSelector((state) => state.notification)

  return <div style={notification.style}>{notification.text}</div>
}

export default NotificationMessage
