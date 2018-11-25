import React from 'react'

const NotificationBox = ({ notification, notificationClass }) => {
  if (notification === null) {
    return null
  } else {
    return (
      <div className={notificationClass}>
        <p>{notification}</p>
      </div>
    )
  }
}

export default NotificationBox