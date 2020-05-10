import React, { Component } from 'react'
import MainNavBar from '../MainNavbar'
import MainFooter from '../Mainfooter'
import api from '../../api'

export default class ManageAppointment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: [],
    }
  }

  deleteAppointment(appointmentId) {
    api
      .deleteAppointment(appointmentId)
      .then((appointment) => {
        this.componentDidMount()
      })
      .catch((err) => console.log(err))
  }

  convertToReadbleHour(hourAndMinutes) {
    let h = Math.floor(hourAndMinutes / 60)
    let m = hourAndMinutes % 60
    if (m < 10) m = '0' + m
    return h + ':' + m
  }

  render() {
    return <div className="ManageAppointment"></div>
  }

  componentDidMount() {
    api
      .getAppointments()
      .then((appointments) => {
        this.setState({
          appointments: appointments,
        })
      })
      .catch((err) => console.log(err))
  }
}
