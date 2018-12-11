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

export const notify = (msg, time) => {
  return async dispatch => {
    const timeAsNumber = Number(time)
    await dispatch({
      type: 'CHANGE_NOTIFICATION_MESSAGE',
      msg: msg
    })
    await setTimeout(() => {
      dispatch({
        type: 'ZERO'
      })
    }, timeAsNumber * 1000)
  }
}

export default notificationReducer
