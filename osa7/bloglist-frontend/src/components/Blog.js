import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { increaseLikes, blogDelete } from '../reducers/blogReducer'
import Commentform from './Commentform'
import { removeBlogfromUser } from '../reducers/usersReducer'
import { Button } from 'react-bootstrap'

class Blog extends React.Component {
    increaseLikes = blog => {
        try {
            this.props.increaseLikes(blog)
        } catch (exception) {
            console.log(exception)
        }
    }

    deleteBlog = id => {
        try {
            this.props.blogDelete(id)

            const userInfo = this.props.users.find(user => user.username === this.props.user.username)
            this.props.removeBlogfromUser(userInfo.id, id)
            this.props.history.push('/')
        } catch (exception) {
            console.log(exception)
        }
    }
    render() {
        const blog = this.props.oneBlog
        return (
            <div>
                <div><h1>{blog.title}</h1></div>

                <div><a href={blog.url}>{blog.url}</a></div>
                <div>{blog.likes} likes <Button bsStyle="success" bsSize='xsmall' value={blog} onClick={() => this.increaseLikes(blog)}>Like</Button></div>
                <div>added by: <NavLink exact to={`/users/${blog.user._id}`}>{blog.user.name}</NavLink></div>
                {(typeof blog.user === 'undefined') ||(
                    (this.props.user.username === blog.user.username) && (
                        <Button bsSize='xsmall' bsStyle="danger" onClick={() => this.deleteBlog(blog.id)}>Delete</Button>
                    ))}
                <p></p>
                <h2>Comments</h2>
                <div>
                    <Commentform blog={blog} />
                </div>
                <ul>
                {((typeof blog.comments !== 'undefined') || blog.comments.length===0) 
                &&(blog.comments.map(c => (
                    <li key={c._id}>{c.content}</li>
                )))}
                </ul>
                
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        user: state.user,
        users: state.users
    }
}

export default connect(
    mapStateToProps,
    { increaseLikes, blogDelete, removeBlogfromUser }
)(Blog)