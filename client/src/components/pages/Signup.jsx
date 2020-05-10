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
    return (
      <div className="signup">
        <img src="/img/professional.svg" height="200px" />
        <form>
          <input
            placeholder="Email..."
            type="text"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <input
            placeholder="Name..."
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <input
            placeholder="Password..."
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <button onClick={(e) => this.handleClick(e)}>Signup</button>
          <p>
            Have an Account ? <Link to="/login">Log In</Link>
          </p>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>
    )
  }
}
