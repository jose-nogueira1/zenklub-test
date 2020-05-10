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

  therapists(therapists) {
    for (let i = 0; i < therapists.length; i++) {
      return (
        <div className="therapist">
          <img src={therapists[i].logo} alt="" />
          <div className="therapistInfo">
            {therapists[i].name} <br />
            {therapists[i].type} | {therapists[i].location} <br />€
            {therapists[i].price} / 50 minutes <br />
            <Link to={`/therapist/${therapists[i]._id}`}>Check Therapist</Link>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="home">
        <MainNavBar>Zenklub Express</MainNavBar>
        <div className="mainSection">{this.therapists}</div>
        <MainFooter />
      </div>
    )
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
