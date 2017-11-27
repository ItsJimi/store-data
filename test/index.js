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

    it('update', (done) => {
      users.setSync('update', {name: 'Jimi'})
      users.update('update', {age: 20}).then(() => {
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('list', (done) => {
      users.list().then(value => {
        assert.deepEqual(value, ['name', 'update']);
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('update get', (done) => {
      users.get('update').then(value => {
        assert.deepEqual(value.name, 'Jimi')
        assert.deepEqual(value.age, 20)
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('delete', (done) => {
      users.delete('name').then(() => {
        assert.deepEqual(users.getSync('name'), undefined)
        users.deleteSync('update')
        assert.deepEqual(users.getSync('update'), undefined)
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

    it('update', (done) => {
      users.setSync('update', {name: 'Jimi'})
      users.update('update', {age: 20}).then(() => {
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('list', (done) => {
      users.list().then(value => {
        assert.deepEqual(value, ['name', 'update']);
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('update get', (done) => {
      users.get('update').then(value => {
        assert.deepEqual(value.name, 'Jimi')
        assert.deepEqual(value.age, 20)
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('delete', (done) => {
      users.delete('name').then(() => {
        assert.deepEqual(users.getSync('name'), undefined)
        users.deleteSync('update')
        assert.deepEqual(users.getSync('update'), undefined)
        done()
      }).catch(err => {
        done(err)
      })
    })
  })
})
