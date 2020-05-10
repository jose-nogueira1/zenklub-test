import React, { Component } from 'react'
import MainNavBar from '../MainNavBar'
import MainFooter from '../MainFooter'
import { Link } from 'react-router-dom'
import api from '../../api'
import './css/Home.css'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      therapists: [],
    }
  }

  render() {
    return <div className="home"></div>
  }

  componentDidMount() {
    api
      .getTherapists()
      .then((therapists) => {
        this.setState({
          therapists: therapists,
        })
      })
      .catch((err) => console.log(err))
  }
}
