const Store = require('../lib')

const users = new Store({
  save: false
})

users.setSync('user123', {
  name: 'Jimi',
  dev: true
})

console.log(users.getSync('user123'))

