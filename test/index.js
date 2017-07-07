const assert = require('assert')
const Store = require('../lib')

/* eslint-env mocha */

describe('store-data', () => {
  describe('In memory (save = false)', () => {
    let users

    it('init', () => {
      users = new Store({
        save: false
      })
    })

    it('getSync', () => {
      assert.deepEqual(users.getSync('name'), undefined)
      users.setSync('name', 'Jimi')
      assert.deepEqual(users.getSync('name'), 'Jimi')
    })

    it('get', (done) => {
      users.get('dev').then(value => {
        assert.deepEqual(value, undefined)
        users.setSync('dev', true)
        users.get('dev').then(value => {
          assert.deepEqual(value, true)
          done()
        })
      })
    })
  })
})
