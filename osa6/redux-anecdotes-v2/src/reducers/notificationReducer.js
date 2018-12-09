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

export const notify = (notification, duration) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'UNSET_NOTIFICATION'
      })
    }, duration*1000)
  }
}

export default reducer