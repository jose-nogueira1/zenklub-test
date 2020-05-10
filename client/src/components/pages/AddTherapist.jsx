import React, { Component } from 'react'
import MainNavBar from '../MainNavBar'
import MainFooter from '../MainFooter'
import api from '../../api'

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
    return <div className="AddTherapist"></div>
  }
}
