const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let joe

  beforeEach(done => {
    joe = User({ name: 'Joe' })
    joe.save().then(() => done())
  })

  it('finds all users with name of joe', done => {
    User.find({ name: 'Joe' })
      .then(users => {
        console.log(users)
        assert(users[0]._id.toString() === joe._id.toString())
        done()
      })
      .catch(error => {
        console.log(error)
        done(error)
      })
  })

  it('find user with particular id', done => {
    User.findOne({ _id: joe._id })
      .then(user => {
        assert(user._id.toString() === joe._id.toString())
        done()
      })
      .catch(error => done(error))
  })
})
