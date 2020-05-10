import React, { Component } from 'react'
import MainNavBar from '../MainNavBar'
import MainFooter from '../Mainfooter'
import './css/Therapist.css'
import api from '../../api'

export default class TherapistProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      therapist: null,
      date: new Date(),
      availableTimes: [],
    }
  }

  convertToReadbleHour(hourAndMinutes) {
    let h = Math.floor(hourAndMinutes / 60)
    let m = hourAndMinutes % 60
    if (m < 10) m = '0' + m
    return h + ':' + m
  }

  bookAppoitment(hourAndMinutes) {
    let body = {
      _therapist: this.props.match.params.therapistId,
      date: this.state.date,
      hourAndMinutes,
    }
    api.addAppointment(body).then((data) => {
      this.componentDidMount()
    })
  }

  incrementDate(delta) {
    let copyDate = new Date(this.state.date)
    copyDate.setDate(copyDate.getDate() + delta)
    this.setState(
      {
        date: copyDate,
      },
      () => {
        this.componentDidMount()
      }
    )
  }

  render() {
    return <div className="therapistProfile"></div>
  }

  componentDidMount() {
    Promise.all([
      api.getTherapist(this.props.match.params.therapistId),
      api.getAvailableTimes(
        this.props.match.params.therapistId,
        this.state.date
      ),
    ])
      .then(([therapist, availableTimes]) => {
        this.setState({
          therapist: therapist,
          availableTimes: availableTimes,
        })
      })
      .catch((err) => console.log(err))
  }
}
