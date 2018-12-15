import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Bloglist extends React.Component {
    render(){
        const blogStyle = {
            width: '50%',
            paddingTop: 10,
            paddingLeft: 10,
            paddingBottom: 10,
            border: 'dashed',
            borderWidth: 1,
            marginBottom: 5
          }
        return(
            <div>

            {this.props.blogs.map(blog => (
                <div style={blogStyle} key={blog.id}>
                    <NavLink exact to={`/blogs/${blog.id}`}>{blog.title}</NavLink>
                </div>
            ))}

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        blogs: state.blogs.sort((a,b) => b.likes-a.likes),
    }
}

export default connect(mapStateToProps)(Bloglist)