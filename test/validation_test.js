const assert = require('assert')
const User = require('../src/user')

describe('validating records', () => {
  it('requires a user name', done => {
    const user = User({ name: undefined })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name is required')
    done()
  })

  it("requires a user's name longer than 2 charactors", done => {
    const user = User({ name: 'Al' })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name must be longer than two charactors')
    done()
  })

  it('disallows invalid records from being saved', done => {
    const user = User({ name: 'Al' })
    user
      .save()
      .then(() => done())
      .catch(({ errors }) => {
        const { message } = errors.name
        assert(message === 'Name must be longer than two charactors')
        done()
      })
  })
})
