const mongoose = require('mongoose')
const Schema = mongoose.Schema

const therapist = new Schema(
  {
    _owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    workingHours: {
      workingHourMonBegin: { type: Number },
      workingHourMonEnd: { type: Number },
      workingHourTueBegin: { type: Number },
      workingHourTueEnd: { type: Number },
      workingHourWedBegin: { type: Number },
      workingHourWedEnd: { type: Number },
      workingHourThuBegin: { type: Number },
      workingHourThuEnd: { type: Number },
      workingHourFriBegin: { type: Number },
      workingHourFriEnd: { type: Number },
      workingHourSatBegin: { type: Number },
      workingHourSatEnd: { type: Number },
      workingHourSunBegin: { type: Number },
      workingHourSunEnd: { type: Number },
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const therapist = mongoose.model('Therapist', therapistSchema)
module.exports = therapist
