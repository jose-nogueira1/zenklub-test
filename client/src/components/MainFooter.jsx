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
    return <div className="footer"></div>
  }
}
