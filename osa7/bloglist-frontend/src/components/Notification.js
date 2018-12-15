import React from 'react'
import { notifySuccess, notifyError } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

class NotificationBox extends React.Component {
  
  render() {
    if (this.props.notifications === null || this.props.notifications === '' || typeof this.props.notifications === 'undefined') {
      return null
    }

    // return <div className={this.props.className}> {this.props.notifications} </div>
    return <Alert bsStyle={this.props.color}> {this.props.notifications} </Alert>
  }
}
const mapStateToProps = state => {
  return {
    notifications: state.notifications[0],
    color: state.notifications[1]
  }
}

export default connect(
  mapStateToProps,
  { notifySuccess, notifyError }
)(NotificationBox)
