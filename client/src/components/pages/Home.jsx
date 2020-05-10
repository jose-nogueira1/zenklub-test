import React, { Component } from 'react'
import MainNavBar from '../MainNavBar'
import MainFooter from '../MainFooter'
import { Link } from 'react-router-dom'
import api from '../../api'
import './css/Home.css'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap'

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
        <div>
          <Card>
            <CardImg
              top
              width="100%"
              src={therapists[i].logo}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{therapists[i].name}</CardTitle>
              <CardSubtitle>
                {therapists[i].type} | {therapists[i].location}
              </CardSubtitle>
              <CardText>{therapists[i].price} / 50 minutes</CardText>
              <Button>
                <Link to={`/therapist/${therapists[i]._id}`}>
                  Check Therapist
                </Link>
              </Button>
            </CardBody>
          </Card>
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
