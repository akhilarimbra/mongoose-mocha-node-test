const assert = require('assert')
const User = require('../src/user')

describe('Creating Records', () => {
  it('saves an user', async () => {
    const joe = User({ name: 'Joe' })
    try {
      await joe.save()
      assert(!joe.isNew)
    } catch (error) {
      console.log(error)
    }
  })
})
