const reducer = (state = 'notification goes here', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
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

export default reducer