const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach

  beforeEach(done => {
    joe = User({ name: 'Joe' })
    maria = User({ name: 'Maria' })
    alex = User({ name: 'Alex' })
    zach = User({ name: 'Zach' })

    // joe.save().then(() => done())
    Promise.all([joe.save(), maria.save(), alex.save(), zach.save()])
      .then(() => done())
      .catch(error => done(error))
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

  it.only('can skip and limit result set', done => {
    User.find({})
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users.length === 2)
        done()
      })
      .catch(error => done(error))
  })
})
