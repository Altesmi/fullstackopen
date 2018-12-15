import React from 'react'
import { NavLink } from 'react-router-dom'

class Menubar extends React.Component {

    render() {
        return (
            <div style={{display: 'inline'}}>
                <NavLink exact to="/" style={{ padding: '10px' }}>Blogs</NavLink>
                <NavLink exact to="/users" style={{ padding: '10px' }}>Users</NavLink>
            </div>
        )
    }
}

export default Menubar