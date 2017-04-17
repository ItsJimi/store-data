var assert = require('assert')
var store = require('../lib')

/* global describe it */

describe('store-data', () => {
  describe('Basic', () => {
    it('init', () => {
      var init = store.init({
        directory: 'documents',
        documents: ['users'],
        save: false
      })
      assert.equal(init, true)
    })
    it('get', () => {
      store.set('users', 'abc123', {
        firstname: 'Jimi',
        lastname: 'blabla',
        test: true
      })
      var user = store.get('users', 'abc123')
      assert.equal(user.firstname, 'Jimi')
      assert.equal(user.lastname, 'blabla')
      assert.equal(user.test, true)
    })
  })
})
