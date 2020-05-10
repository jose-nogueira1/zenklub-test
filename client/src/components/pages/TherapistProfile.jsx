import React, { Component } from 'react'
import MainNavBar from '../MainNavBar'
import MainFooter from '../Mainfooter'
import './css/Therapist.css'
import api from '../../api'
import { Container, Row, Col, CardSubtitle, Button } from 'reactstrap'

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
    return (
      <div className="therapistProfile">
        <MainNavBar>Therapist</MainNavBar>
        {this.state.therapist && (
          <Container>
            <Row>
              <Col lg="6">
                <Row>
                  <Col>
                    <img src={this.state.therapist.logo} alt="" />
                  </Col>
                  <Col>
                    <Row>
                      <h1>{this.state.therapist.name}</h1>
                    </Row>
                    <Row>
                      <h2>{this.state.therapist.type} |</h2>
                      <h3>{this.state.therapist.location}</h3>
                    </Row>
                    <Row>Rating</Row>
                    <Row>
                      <h2>€ {this.state.therapist.price} / 50 minutes</h2>
                    </Row>
                  </Col>
                </Row>
                <Row>{this.state.therapist.description}</Row>
              </Col>
              <Col lg="6">
                <Row>
                  <Card body>
                    <CardTitle>Schedule your session!</CardTitle>
                    <CardSubtitle>Timezone: Lisbon (+1)</CardSubtitle>
                  </Card>
                </Row>
                <Row>
                  <Button onClick={() => this.incrementDate(-1)}>
                    <img src="/img/previous" alt="" />
                  </Button>
                  {this.state.date.toLocaleDateString()}
                  <Button onclick={() => this.incrementDate(+1)}>
                    <img src="/img/forward" alt="" />
                  </Button>
                </Row>
                <ul>
                  {this.state.availableTimes.map(
                    (time) =>
                      time.status === 'Available' && (
                        <li key={time.hourAndMinutes}>
                          <Button
                            onClick={() =>
                              this.bookAppoitment(time.hourAndMinutes)
                            }
                          >
                            {this.convertToReadbleHour(time.hourAndMinutes)}{' '}
                            {time.status === 'Available'}
                          </Button>
                        </li>
                      )
                  )}
                </ul>
              </Col>
            </Row>
          </Container>
        )}
        <MainFooter />
      </div>
    )
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
