const express = require('express')
const Therapist = require('../models/Therapist')
const { isLoggedIn } = require('../middlewares')
const Cloudinary = require('../configs/cloudinary')

const router = express.Router()

router.post(
  '/therapist',
  Cloudinary.single('logo'),
  isLoggedIn,
  (req, res, next) => {
    let {
      name,
      type,
      location,
      price,
      description,
      workingHourMonBegin,
      workingHourMonEnd,
      workingHourTueBegin,
      workingHourTueEnd,
      workingHourWedBegin,
      workingHourWedEnd,
      workingHourThuBegin,
      workingHourThuEnd,
      workingHourFriBegin,
      workingHourFriEnd,
      workingHourSatBegin,
      workingHourSatEnd,
      workingHourSunBegin,
      workingHourSunEnd,
    } = req.body
    let _owner = req.user._id
    let logo = req.file && req.file.url
    Therapist.create({
      _owner,
      name,
      type,
      location,
      price,
      description,
      workingHours: {
        workingHourMonBegin,
        workingHourMonEnd,
        workingHourTueBegin,
        workingHourTueEnd,
        workingHourWedBegin,
        workingHourWedEnd,
        workingHourThuBegin,
        workingHourThuEnd,
        workingHourFriBegin,
        workingHourFriEnd,
        workingHourSatBegin,
        workingHourSatEnd,
        workingHourSunBegin,
        workingHourSunEnd,
      },
      logo,
    })
      .then((therapist) => {
        res.json({
          success: true,
          therapist,
        })
      })
      .catch((err) => next(err))
  }
)

router.get('/therapist', (req, res, next) => {
  Therapist.find()
    .then((therapist) => {
      res.json(therapist)
    })
    .catch((err) => next(err))
})

router.get('/therapist/:therapistId', (req, res, next) => {
  Therapist.findById(req.params.therapistId)
    .then((therapist) => {
      if (therapist) {
        res.json(therapist)
      } else {
        next({
          status: 400,
          message:
            'There is no therapist with the id: ' + req.params.therapistId,
        })
      }
    })
    .catch((err) => next(err))
})

router.delete('/therapist/:therapistId', isLoggedIn, (req, res, next) => {
  Therapist.findById(req.params.therapistId)
    .then((therapist) => {
      if (req.user._id.equals(therapist._owner)) {
        Therapist.findOneAndRemove(req.params._id).then((therapist) => {
          res.json({
            success: true,
          })
        })
      } else {
        next({
          status: 403,
          message: 'User cannot delete this Therapist',
        })
      }
    })
    .catch((err) => next(err))
})
