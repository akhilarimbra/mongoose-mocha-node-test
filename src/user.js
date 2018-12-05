const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than two charactors'
    }
  },
  postCount: { type: Number, default: 0, required: true }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
