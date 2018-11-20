import React from 'react'

const Loginform = (props) => {

    return (<form onSubmit={props.login}>
        <div>
            Log in
        </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Username</label></td><td><input type='text' name='username' value={props.username} onChange={props.loginFieldChanged} /></td>
                        
                    </tr>
                    <tr>
                        <td><label>Password</label></td><td><input type='password' name='password' value={props.password} onChange={props.loginFieldChanged} /></td>
                        
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

export default Loginform