const notificationReducer = (store = 'Waiting for an action...', action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION_MESSAGE':
      return action.msg

    case 'ZERO':
      return 'Waiting for an action...'
    default:
      return store
  }
}


export const notificationSetter = (msg) => {
  return {
    type: 'CHANGE_NOTIFICATION_MESSAGE',
    msg: msg
  }
}

export const notificationZeroer = () => {
  return {
    type: 'ZERO'
  }
}

export default notificationReducer
