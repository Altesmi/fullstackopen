import React from 'react'
import { notifySuccess, notifyError } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class NotificationBox extends React.Component {
  render() {
    if (this.props.notifications === null || this.props.notifications === '') {
      return null
    }

    return <div className={this.props.className}> {this.props.notifications} </div>
  }
}
const mapStateToProps = state => {
  return {
    notifications: state.notifications[0],
    className: state.notifications[1]
  }
}

export default connect(
  mapStateToProps,
  { notifySuccess, notifyError }
)(NotificationBox)
