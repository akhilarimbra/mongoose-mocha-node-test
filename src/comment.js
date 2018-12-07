const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
