const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema(
  {
    _customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    _therapist: {
      type: Schema.Types.ObjectId,
      ref: 'Therapist',
    },
    date: Date,
    hourAndMinutes: Number,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment
