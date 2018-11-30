const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
  name: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
