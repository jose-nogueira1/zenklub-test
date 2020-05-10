import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClick(e) {
    e.preventDefault()
    api
      .login(this.state.email, this.state.password)
      .then((result) => {
        console.log('SUCCESS!')
        this.props.history.push('/') // Redirect to the home page
      })
      .catch((err) => this.setState({ message: err.toString() }))
  }

  render() {
    return <div className="Login"></div>
  }
}
