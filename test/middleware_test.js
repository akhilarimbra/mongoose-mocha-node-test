const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blog_post')

describe('Middleware', () => {
  let joe, blogPost

  beforeEach(done => {
    joe = User({ name: 'Joe' })
    blogPost = BlogPost({ title: 'JSX is great', content: 'It really is' })
    joe.blogPosts.push(blogPost)

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done())
      .catch(error => done(error))
  })

  it('users clean up dangling blogPosts on remove', done => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0)
        done()
      })
      .catch(error => done(error))
  })
})
