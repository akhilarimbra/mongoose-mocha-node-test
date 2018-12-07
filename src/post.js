const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = Schema({
  title: String
})

module.exports = PostSchema
