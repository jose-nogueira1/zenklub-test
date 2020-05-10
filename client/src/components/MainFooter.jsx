import React from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import './css/MainFooter.css'

export default class MainFooter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleLogoutClick = (e) => {
    api.logout()
  }

  render() {
    return (
      <div className="footer">
        {api.isLoggedIn() && (
          <Link to="/appointments">
            <img src="/img/calendar.png" alt="" />
          </Link>
        )}
        {api.isLoggedIn() && (
          <Link to="/therapist">
            <img src="/img/add.png" alt="" />
          </Link>
        )}
        <Link to="/">
          <img src="/img/home.png" alt="" />
        </Link>
        {!api.isLoggedIn() && (
          <Link to="/login">
            <img src="/img/login.png" alt="" />
          </Link>
        )}
        {api.isLoggedIn() && (
          <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>
            <img src="/img/logout.png" alt="" />
          </Link>
        )}
      </div>
    )
  }
}
