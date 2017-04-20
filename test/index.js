var assert = require('assert')
var store = require('../lib')

/* global describe it */

describe('store-data', () => {
  it('init', () => {
    var init = store.init({
      directory: 'documents',
      documents: ['users'],
      save: true
    })
    assert.equal(init, true)
  })
  it('get', () => {
    store.set('users', '1', {
      firstname: 'Jimi',
      lastname: 'blabla',
      test: true
    })
    store.set('users', '2', {
      firstname: 'John',
      lastname: 'Doe'
    })
    var user = store.get('users', '1')
    assert.equal(user.firstname, 'Jimi')
    assert.equal(user.lastname, 'blabla')
    assert.equal(user.test, true)
  })
  it('delete', () => {
    store.del('users', '1')
    var user1 = store.get('abc123')
    assert.equal(user1, false)
    var user2 = store.get('users', '2')
    assert.equal(user2.firstname, 'John')
    assert.equal(user2.lastname, 'Doe')
  })
})
