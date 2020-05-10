import React from 'react'
import './css/MainNavBar.css'

export default class MainNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
    }
  }

  toogle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <div className="navBar">
        <nav>
          <h1>{this.props.children}</h1>
        </nav>
      </div>
    )
  }
}
