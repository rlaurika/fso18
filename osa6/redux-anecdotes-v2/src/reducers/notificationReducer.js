const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'UNSET_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const notificationSetting = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationClearing = () => {
  return {
    type: 'UNSET_NOTIFICATION'
  }
}

export default reducer