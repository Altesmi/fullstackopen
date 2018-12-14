import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Users extends React.Component {

    render() {
        return (
            <div>
                <h2>Users</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><b>Name</b></td><td><b>blogs</b></td>
                        </tr>
                        {this.props.users.map(user => (
                            <tr>
                                <td><NavLink exact to={`/users/${user.id}`}>{user.name} </NavLink></td> <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps)(Users)