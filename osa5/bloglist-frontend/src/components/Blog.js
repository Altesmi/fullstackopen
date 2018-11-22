import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog,increaseLikes,deleteBlog,user}) => {
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
  <div style={blogStyle}>
    {blog.title} {blog.author} 
    
    <Togglable buttonlabel="Show more">
      <div>
        url: <a href={blog.url}>{blog.url}</a>
      </div>
      <div>Likes: {blog.likes} 
      <button value={blog} onClick={increaseLikes}>Like</button>
      </div>
      <div>Added by {typeof(blog.user)!=='undefined' ? blog.user.username: 'anonymous'}
        { (typeof(blog.user) === 'undefined' || (user.username===blog.user.username))
             && <button onClick={deleteBlog}>Delete</button>
        } 
        </div>
    </Togglable>
  </div>  
)}

export default Blog