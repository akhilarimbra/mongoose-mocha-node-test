const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = require('./post')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than two charactors'
    }
  },
  posts: [PostSchema],
  likes: { type: Number, default: 0, required: true },
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }]
})

UserSchema.virtual('postCount').get(function() {
  return this.posts.length
})

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('BlogPost')
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next())
    .catch(error => next(error))
})

const User = mongoose.model('User', UserSchema)

module.exports = User
