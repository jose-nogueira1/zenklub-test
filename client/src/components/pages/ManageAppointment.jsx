import React, { Component } from 'react'
import MainNavBar from '../MainNavbar'
import MainFooter from '../Mainfooter'
import api from '../../api'
import { Card, Button, CardTitle, CardText } from 'reactstrap'

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
    return (
      <div className="ManageAppointment">
        <MainNavBar canGoBack>My Appointments</MainNavBar>
        {this.state.appointments.map((appointment) => (
          <div key={appointment._id}>
            <Card body>
              <CardTitle>
                <strong>Therapist: </strong> {appointment._therapist.name}
              </CardTitle>
              <CardText>
                <strong>Date: </strong>
                {new Date(appointment.date)
                  .toLocaleString('pt-PT')
                  .substr(0, 10)}{' '}
                | <strong>Time: </strong>
                {this.convertToReadbleHour(appointment.hourAndMinutes)}
              </CardText>
              <Button onClick={() => this.deleteAppointment(appointment._id)}>
                Delete
              </Button>
            </Card>
          </div>
        ))}
        <MainFooter />
      </div>
    )
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
