const assert = require('assert')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blog_post')

describe('Associations', () => {
  let joe, blogPost, comment

  beforeEach(done => {
    joe = User({ name: 'Joe' })
    blogPost = BlogPost({ title: 'JSX is great', content: 'It really is' })
    comment = Comment({ content: 'Congrats on great post' })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
      .catch(error => done(error))
  })

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JSX is great')
        done()
      })
      .catch(error => done(error))
  })

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: { path: 'comments', populate: { path: 'user' } }
      })
      .then(user => {
        console.log(user.blogPosts[0])
        done()
      })
      .catch(error => done(error))
  })
})
