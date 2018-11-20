import React from 'react'

const Blogform = (props) => {

    return (<form onSubmit={props.postBlog}>
        <div>
            Add a new blog
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
            <button type='submit'>Submit</button>
        </div>
    </form>
    )

}

export default Blogform