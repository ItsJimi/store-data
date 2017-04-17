var store = require('../lib')

store.init({
  directory: 'documents',
  documents: ['users', 'cars', 'blabla'],
  save: false // false or number in millisecond
})

store.set('users', 'abc123', {
  firstname: 'Jimi',
  lastname: 'blabla',
  test: true
})
console.log(store.get('users', 'abc123'))
