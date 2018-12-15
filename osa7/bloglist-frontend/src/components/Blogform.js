import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Blogform = (props) => {

    return (<form onSubmit={props.postBlog}>
        <div>
                <h3>Add a new blog</h3>
        </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Title</label></td><td><input type='text' name='title' value={props.title} onChange={props.blogFieldChanged} /></td>

                    </tr>
                    <tr>
                        <td><label>Author</label></td><td><input type='text' name='author' value={props.author} onChange={props.blogFieldChanged} /></td>

                    </tr>
                    <tr>
                        <td><label>URL</label></td><td><input type='text' name='url' value={props.url} onChange={props.blogFieldChanged} /></td>

                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <Button bsStyle="success" bsSize="small" type='submit'>Submit</Button>
        </div>
    </form>
    )

}

Blogform.propTypes = {
    postBlog: PropTypes.func.isRequired,
    blogFieldChanged: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}
export default Blogform