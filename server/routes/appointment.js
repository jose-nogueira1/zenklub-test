const express = require('express')
const Appointment = require('../models/Appointment')
const { isLoggedIn } = require('../middlewares')
const Therapist = require('../models/Therapist')

const router = express.Router()

router.post('/appointment', isLoggedIn, (req, res, next) => {
  let { _therapist, date, hourAndMinutes } = req.body
  let _customer = req.user._id
  Appointment.create({ _therapist, date, hourAndMinutes, _customer })
    .then((appointment) => {
      res.json({
        success: true,
        appointment,
      })
    })
    .catch((err) => next(err))
})

router.get('/appointment', (req, res, next) => {
  Appointment.find({ _customer: req.user._id })
    .populate('_therapist')
    .then((appointment) => {
      res.json(appointment)
    })
    .catch((err) => next(err))
})

router.get('/appointment/:appointmentId', (req, res, next) => {
  Appointment.findById(req.params.appointmentId)
    .then((appointment) => {
      if (appointment) {
        res.json(appointment)
      } else {
        next({
          status: 400,
          message:
            'There is no Appointment with the id: ' + req.params.appointmentId,
        })
      }
    })
    .catch((err) => next(err))
})

router.delete('/appointment/:appointmentId', isLoggedIn, (req, res, next) => {
  Appointment.findById(req.params.appointmentId)
    .then((appointment) => {
      if (req.user._id.equals(appointment._customer)) {
        Appointment.findByIdAndDelete(appointment._id).then((appointment) => {
          res.json({
            success: true,
          })
        })
      } else {
        next({
          status: 403,
          message: "User cannot delete other user's appointment",
        })
      }
    })
    .catch((err) => next(err))
})

router.get('/available-times/:therapistId', (req, res, next) => {
  let { date } = req.query
  if (!date) next({ status: 400, message: 'You must send a date' })

  let _id = req.params.therapistId
  Therapist.findById({ _id })
    .then((therapist) => {
      Appointment.find({ _therapist: _id }).then((appointments) => {
        let day = new Date(date).getDay()
        let workingHourBegin, workingHourEnd
        switch (day) {
          case 0:
            workingHourBegin = therapist.workingHours.workingHourSunBegin
            workingHourEnd = therapist.workingHours.workingHourSunEnd
            break
          case 1:
            workingHourBegin = therapist.workingHours.workingHourMonBegin
            workingHourEnd = therapist.workingHours.workingHourMonEnd
            break
          case 2:
            workingHourBegin = therapist.workingHours.workingHourTusBegin
            workingHourEnd = therapist.workingHours.workingHourTusEnd
            break
          case 3:
            workingHourBegin = therapist.workingHours.workingHourWedBegin
            workingHourEnd = therapist.workingHours.workingHourWedEnd
            break
          case 4:
            workingHourBegin = therapist.workingHours.workingHourThuBegin
            workingHourEnd = therapist.workingHours.workingHourThuEnd
            break
          case 5:
            workingHourBegin = therapist.workingHours.workingHourFriBegin
            workingHourEnd = therapist.workingHours.workingHourFriEnd
            break
          case 6:
            workingHourBegin = therapist.workingHours.workingHourSatBegin
            workingHourEnd = therapist.workingHours.workingHourSatEnd
            break
          default:
            throw new Error('There is a problem with the day ' + day)
        }
        let output = []
        for (
          let hourAndMinutes = workingHourBegin * 60;
          hourAndMinutes < workingHourEnd * 60;
          hourAndMinutes += 50
        ) {
          output.push({
            hourAndMinutes: hourAndMinutes,
            status:
              appointments.filter(
                (appointment) => appointment.hourAndMinutes === hourAndMinutes
              ).length === 0
                ? 'Available'
                : 'Unavailable',
          })
        }
        res.json(output)
      })
    })
    .catch((err) => next(err))
})

module.exports = router
