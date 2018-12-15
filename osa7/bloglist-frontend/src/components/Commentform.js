import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { notifySuccess} from '../reducers/notificationReducer'

class Commentform extends React.Component {
    sendComment = e => {
        e.preventDefault()
        this.props.addComment(this.props.blog.id, e.target.comment.value)
        this.props.notifySuccess(`Succesfully posted comment ${e.target.comment.value}
            to blog ${this.props.blog.name}`, 5)
        e.target.comment.value = ''

    }
    render() {
        return (
            <div style={{ display: 'inline' }}>
                <form onSubmit={this.sendComment}>
                    <input name="comment" />
                    <button>send</button>
                </form>
            </div>
        )
    }
}

export default connect(
    null,
    { addComment, notifySuccess }
)(Commentform)