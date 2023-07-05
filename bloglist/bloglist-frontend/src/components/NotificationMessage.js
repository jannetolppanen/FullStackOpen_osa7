import React from "react";
import { useSelector } from "react-redux";
//message contains message.text as the message and message.css with the css style that defines the color. using inline css style to set color

const NotificationMessage = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div style={notification.style}>
      {notification.text}
    </div>
  );
};

export default NotificationMessage;