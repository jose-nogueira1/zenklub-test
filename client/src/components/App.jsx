import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddTherapist from './pages/AddTherapist'
import TherapistProfile from './pages/TherapistProfile'
import ManageAppointment from './pages/ManageAppointment'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/therapist/:therapistId" component={TherapistProfile} />
          <Route path="/therapist" component={AddTherapist} />
          <Route path="/appointments" component={ManageAppointment} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}
