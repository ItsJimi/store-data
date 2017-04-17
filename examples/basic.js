var store = require('../lib')

store.init({
  directory: 'documents',
  documents: ['users', 'tests', 'cars', 'blabla']
})

console.log(store.get('users', 'abc123'))
store.set('users', 'abc123', {
  name: 'Jimi',
  age: 19
})
console.log(store.get('users', 'abc123'))

// console.log(store.keys('users'))
