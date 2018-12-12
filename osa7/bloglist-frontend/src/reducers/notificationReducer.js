const notificationReducer = (store = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [ action.msg, action.className ]

    default:
      return store
  }
}

export const notifySuccess = (msg, time) => {
  return async dispatch => {
    const timeAsNumber = Number(time)
    await dispatch({
      type: 'SET_NOTIFICATION',
      msg: msg,
      className: 'successNotification'
    })

    await setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        msg: '',
        className: ''
      })
    }, timeAsNumber * 1000)
  }
}

export const notifyError = (msg, time) => {
  return async dispatch => {
    const timeAsNumber = Number(time)
    await dispatch({
      type: 'SET_NOTIFICATION',
      msg: msg,
      className: 'errorNotification'
    })

    await setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        msg: '',
        className: ''
      })
    }, timeAsNumber * 1000)
  }
}

export default notificationReducer
