import React from 'react'
import Togglable from './Togglable'
import { connect } from 'react-redux'

//const Blog = ({blog,increaseLikes,deleteBlog,user}) => {
class Blog extends React.Component {
  render() {
    const blogStyle = {
      width: '50%',
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      border: 'dashed',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle} className="blogName">
        {this.props.blog.title} {this.props.blog.author}
        <Togglable buttonlabel="Show more">
          <div className="url">
            url: <a href={this.props.blog.url}>{this.props.blog.url}</a>
          </div>
          <div className="likes">
            Likes: {this.props.blog.likes}
            <button value={this.props.blog} onClick={this.props.increaseLikes}>
              Like
            </button>
          </div>

          <div className="addedInfo">
            Added by{' '}
            {typeof this.props.blog.user !== 'undefined'
              ? this.props.blog.user.username
              : 'anonymous'}
            {(typeof this.props.blog.user === 'undefined' ||
              this.props.user.username === this.props.blog.user.username) && (
              <button onClick={this.props.deleteBlog}>Delete</button>
            )}
          </div>
        </Togglable>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Blog)
