const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: { ObjectId }} = Schema

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  repassword: {
    type: String,
  },
  birth: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  imgUrl: {
    type: String,
    default: false,
  },
  followUser: [{
    type: ObjectId,
    ref: 'friend'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User