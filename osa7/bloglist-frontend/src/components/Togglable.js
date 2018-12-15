import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        const hideWhenVisible = {
            display: this.state.visible ? 'none' : ''
        }

        const showWhenVisible = {
            display: this.state.visible ? '' : 'none'
        }

        return (
            <div style={{paddingLeft: '10%'}}>
                <div style={hideWhenVisible}>
                    <Button bsStyle="primary" bsSize="small" onClick={this.toggleVisibility}>{this.props.buttonlabel}</Button>
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                    <Button bsStyle="warning" bsSize="xsmall" onClick={this.toggleVisibility}>Cancel</Button>
                </div>
            </div>

        )
    }
}
Togglable.propTypes = {
    buttonlabel: PropTypes.string.isRequired
}
export default Togglable