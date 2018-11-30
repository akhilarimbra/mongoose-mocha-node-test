const assert = require('assert')
const User = require('../src/user')

describe('Deleting a user', () => {
  let joe

  beforeEach(done => {
    joe = User({ name: 'Joe' })
    joe
      .save()
      .then(() => done())
      .catch(error => done(error))
  })

  it('model instance removed', done => {
    joe
      .remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null)
        done()
      })
      .catch(error => done(error))
  })

  it('class method remove', done => {
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null)
        done()
      })
      .catch(error => done(error))
  })

  it('class method find and remove', done => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null)
        done()
      })
      .catch(error => done(error))
  })

  it('class method find by id and remove', done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null)
        done()
      })
      .catch(error => done(error))
  })
})
