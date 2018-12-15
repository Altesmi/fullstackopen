import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Bloglist extends React.Component {
    render() {
        return (
            <div style={{paddingLeft: '10%'}}>
                <ListGroup bsStyle="info" style={{ float: 'center', width: '65%' }}>
                    {this.props.blogs.map(blog => (
                        <LinkContainer to={`/blogs/${blog.id}`} key={blog.id}>
                            <ListGroupItem key={blog.id}>
                                {blog.title}
                            </ListGroupItem>
                        </LinkContainer>
                    ))}
                </ListGroup>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        blogs: state.blogs.sort((a, b) => b.likes - a.likes),
    }
}

export default connect(mapStateToProps)(Bloglist)