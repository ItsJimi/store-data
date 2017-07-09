'use strict'
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

    it('setSync', () => {
      users.setSync('name', 'Jimi')
    })

    it('getSync', () => {
      assert.deepEqual(users.getSync('name'), 'Jimi')
    })

    it('deleteSync', () => {
      users.deleteSync('name')
      assert.deepEqual(users.getSync('name'), undefined)
    })

    it('set', (done) => {
      users.set('name', 'Jimi').then(() => {
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('get', (done) => {
      users.get('name').then(value => {
        assert.deepEqual(value, 'Jimi')
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('delete', (done) => {
      users.delete('name').then(() => {
        assert.deepEqual(users.getSync('name'), undefined)
        done()
      }).catch(err => {
        done(err)
      })
    })
  })

  describe('Persistent (save = true)', () => {
    let users

    it('init', () => {
      users = new Store({
        save: true,
        directory: 'storage',
        name: 'users'
      })
    })

    it('setSync', () => {
      users.setSync('name', 'Jimi')
    })

    it('getSync', () => {
      assert.deepEqual(users.getSync('name'), 'Jimi')
    })

    it('deleteSync', () => {
      users.deleteSync('name')
      assert.deepEqual(users.getSync('name'), undefined)
    })

    it('set', (done) => {
      users.set('name', 'Jimi').then(() => {
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('get', (done) => {
      users.get('name').then(value => {
        assert.deepEqual(value, 'Jimi')
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('delete', (done) => {
      users.delete('name').then(() => {
        assert.deepEqual(users.getSync('name'), undefined)
        done()
      }).catch(err => {
        done(err)
      })
    })
  })
})
