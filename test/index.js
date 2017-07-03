const assert = require('assert')
const Store = require('../lib')

/* global describe it */

describe('store-data', () => {
  it('init', () => {
    const users = new Store({
      name: 'users',
      directory: 'db',
      save: false
    })

    console.log(users)
  })
})
