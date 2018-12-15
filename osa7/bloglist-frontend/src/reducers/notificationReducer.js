const notificationReducer = (store = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [ action.msg, action.color ]

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
      color: 'success'
    })

    await setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        msg: '',
        color: ''
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
      color: 'danger'
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
