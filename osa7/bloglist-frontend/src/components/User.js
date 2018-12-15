import React from 'react'


class User extends React.Component {
    increaseLikes 
    render() {
        const user = this.props.user
        return (
            <div>
                <div><h1>{user.name}</h1></div>


                <div><h2>Added blogs</h2></div>

                <ul>
                    {user.blogs.map(b => (
                        <li key={b._id}>{b.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default User