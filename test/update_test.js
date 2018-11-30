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

  it('instance type using set and save', done => {
    joe
      .set('name', 'Alex')
      .save()
      .then(() => done())
      .catch(error => done(error))
  })
})
