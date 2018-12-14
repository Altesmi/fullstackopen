import React from 'react'


class User extends React.Component {

    render() {
        const user = this.props.user
        return (
            <div>
                <h1>{user.name}</h1>

                <p>
                    <h2>Added blogs</h2>
                </p>
                <ul>
                    {user.blogs.map(b => (
                        <li>{b.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default User