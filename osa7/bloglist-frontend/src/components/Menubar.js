import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Menubar extends React.Component {

    render() {
        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <NavLink exact to="/">Blog app</NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer exact to="/">
                                <NavItem>Blogs</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/users">
                                <NavItem>Users</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </ Navbar>

            </div>
        )
    }
}

export default Menubar