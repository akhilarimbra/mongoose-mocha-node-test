const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let joe

  beforeEach(done => {
    joe = User({ name: 'Joe' })
    joe
      .save()
      .then(() => done())
      .catch(error => done(error))
  })

  const assertName = (operation, done) => {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1)
        assert(users[0].name === 'Alex')
        done()
      })
      .catch(error => done(error))
  }

  it('instance type using set and save', done =>
    assertName(joe.set('name', 'Alex').save(), done))

  it('model instance can update', done =>
    assertName(joe.update({ name: 'Alex' }), done))
})
