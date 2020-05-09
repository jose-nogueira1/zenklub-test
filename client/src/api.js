import axios from 'axios'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api',
  withCredentials: true,
})

const errHandler = (err) => {
  console.error(err)
  if (err.response && err.response.data) {
    console.error('API response', err.response.data)
    throw err.response.data.message
  }
  throw err
}

export default {
  service: service,
  isLoggedIn() {
    return localStorage.getItem('user') != null
  },

  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'))
  },

  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        return res.data
      })
      .catch(errHandler)
  },

  logout() {
    localStorage.removeItem('user')
    return service.get('/logout')
  },

  getTherapists() {
    return service
      .get('/therapist')
      .then((res) => res.data)
      .catch(errHandler)
  },

  addTherapist(uploadData) {
    return service
      .post('/therapist', uploadData)
      .then((res) => res.data)
      .catch(errHandler)
  },

  getTherapist(therapistId) {
    return service
      .get(`/therapist/${therapistId}`)
      .then((res) => res.data)
      .catch(errHandler)
  },

  getAppointments() {
    return service
      .get('/appointment')
      .then((res) => res.data)
      .catch(errHandler)
  },

  addAppointment(uploadData) {
    return service
      .post('/appointment', uploadData)
      .then((res) => res.data)
      .catch(errHandler)
  },

  getAppointment(appointmentId) {
    return service
      .get(`/appointment/${appointmentId}`)
      .then((res) => res.data)
      .catch(errHandler)
  },

  deleteAppointment(appointmentId) {
    return service
      .delete(`/appointment/${appointmentId}`)
      .then((res) => res.data)
      .catch(errHandler)
  },

  getAvailableTimes(therapistId, date) {
    return service
      .get(`/available-times/${therapistId}`, { params: { date } })
      .then((res) => res.data)
      .catch(errHandler)
  },
}
