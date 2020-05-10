import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
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
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api
      .signup(data)
      .then((result) => {
        console.log('SUCCESS!')
        this.props.history.push('/') // Redirect to the home page
      })
      .catch((err) => this.setState({ message: err.toString() }))
  }

  render() {
    return <div className="Signup"></div>
  }
}
