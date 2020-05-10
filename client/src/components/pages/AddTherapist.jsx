import React, { Component } from 'react'
import MainNavBar from '../MainNavBar'
import MainFooter from '../MainFooter'
import api from '../../api'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'

export default class AddTherapist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      location: '',
      price: null,
      description: '',
      workingHours: {
        workingHourMonBegin: null,
        workingHourMonEnd: null,
        workingHourTueBegin: null,
        workingHourTueEnd: null,
        workingHourWedBegin: null,
        workingHourWedEnd: null,
        workingHourThuBegin: null,
        workingHourThuEnd: null,
        workingHourFriBegin: null,
        workingHourFriEnd: null,
        workingHourSatBegin: null,
        workingHourSatEnd: null,
        workingHourSunBegin: null,
        workingHourSunEnd: null,
      },
      logo: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFileChange(e) {
    this.setState({
      logo: e.target.files[0],
    })
  }

  handleClick(e) {
    e.preventDefault()
    let uploadData = new FormData()
    uploadData.append('name', this.state.name)
    uploadData.append('type', this.state.type)
    uploadData.append('price', this.state.price)
    uploadData.append('location', this.state.location)
    uploadData.append('description', this.state.description)
    uploadData.append('workingHourMonBegin', this.state.workingHourMonBegin)
    uploadData.append('workingHourMonEnd', this.state.workingHourMonEnd)
    uploadData.append('workingHourTueBegin', this.state.workingHourTueBegin)
    uploadData.append('workingHourTueEnd', this.state.workingHourTueEnd)
    uploadData.append('workingHourWedBegin', this.state.workingHourWedBegin)
    uploadData.append('workingHourWedEnd', this.state.workingHourWedEnd)
    uploadData.append('workingHourThuBegin', this.state.workingHourThuBegin)
    uploadData.append('workingHourThuEnd', this.state.workingHourThuEnd)
    uploadData.append('workingHourFriBegin', this.state.workingHourFriBegin)
    uploadData.append('workingHourFriEnd', this.state.workingHourFriEnd)
    uploadData.append('workingHourSatBegin', this.state.workingHourSatBegin)
    uploadData.append('workingHourSatEnd', this.state.workingHourSatEnd)
    uploadData.append('workingHourSunBegin', this.state.workingHourSunBegin)
    uploadData.append('workingHourSunEnd', this.state.workingHourSunEnd)
    uploadData.append('logo', this.state.logo)

    api
      .addTherapist(uploadData)
      .then((result) => {
        console.log('SUCCESS!')
        this.setState({
          name: '',
          type: '',
          price: '',
          location: '',
          description: '',
          workingHourMonBegin: '',
          workingHourMonEnd: '',
          workingHourTueBegin: '',
          workingHourTueEnd: '',
          workingHourWedBegin: '',
          workingHourWedEnd: '',
          workingHourThuBegin: '',
          workingHourThuEnd: '',
          workingHourFriBegin: '',
          workingHourFriEnd: '',
          workingHourSatBegin: '',
          workingHourSatEnd: '',
          workingHourSunBegin: '',
          workingHourSunEnd: '',
          logo: '',
          message: `Your therapist '${this.state.name}' has been created`,
        })
        this.props.history.push('/')
        setTimeout(() => {
          this.setState({
            message: null,
          })
        }, 2000)
      })
      .catch((err) => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="AddTherapist">
        <MainNavBar canGoBack>Add Therapist</MainNavBar>
        <Form>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="name">Therapist Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="type">Area of Expertice</Label>
                <Input
                  type="text"
                  name="expert field"
                  value={this.state.type}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="type">Price per hour</Label>
                <Input
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="description">Describe your Service</Label>
            <Input
              type="textarea"
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Monday opening:</Label>
                <Input
                  type="number"
                  name="workingHourMonBegin"
                  value={this.state.workingHourMonBegin}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Monday closing:</Label>
                <Input
                  type="number"
                  name="workingHourMonEnd"
                  value={this.state.workingHourMonEnd}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Tuesday opening:</Label>
                <Input
                  type="number"
                  name="workingHourTueBegin"
                  value={this.state.workingHourTueBegin}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Tuesday closing:</Label>
                <Input
                  type="number"
                  name="workingHourTueEnd"
                  value={this.state.workingHourTueEnd}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Wednesday opening:</Label>
                <Input
                  type="number"
                  name="workingHourWedBegin"
                  value={this.state.workingHourWedBegin}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Wednesday closing:</Label>
                <Input
                  type="number"
                  name="workingHourWedEnd"
                  value={this.state.workingHourWedEnd}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Thursday opening:</Label>
                <Input
                  type="number"
                  name="workingHourThuBegin"
                  value={this.state.workingHourThuBegin}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Thursday closing:</Label>
                <Input
                  type="number"
                  name="workingHourThuEnd"
                  value={this.state.workingHourThuEnd}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Friday opening:</Label>
                <Input
                  type="number"
                  name="workingHourFriBegin"
                  value={this.state.workingHourFriBegin}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Friday closing:</Label>
                <Input
                  type="number"
                  name="workingHourFriEnd"
                  value={this.state.workingHourFriEnd}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Saturday opening:</Label>
                <Input
                  type="number"
                  name="workingHourSatBegin"
                  value={this.state.workingHourSatBegin}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Saturday closing:</Label>
                <Input
                  type="number"
                  name="workingHourSatEnd"
                  value={this.state.workingHourSatEnd}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Sunday opening:</Label>
                <Input
                  type="number"
                  name="workingHourSunBegin"
                  value={this.state.workingHourSunBegin}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="description">Sunday closing:</Label>
                <Input
                  type="number"
                  name="workingHourSunEnd"
                  value={this.state.workingHourSunEnd}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="logo">Profile Pic</Label>
            <Input
              type="file"
              name="logo"
              id="file"
              onChange={this.handleFileChange}
            />
          </FormGroup>
          <Button onClick={this.handleClick}>Submit Therapist</Button>
        </Form>
        <MainFooter />
      </div>
    )
  }
}
