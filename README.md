# store-data
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/ItsJimi/store-data.svg?branch=master)](https://travis-ci.org/ItsJimi/store-data)

Simple database written in javascript
## Install
```
npm i store-data
```
## Example
```javascript
var store = require('store-data')

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
```
## Contribute
Feel free to fork and make pull requests
## License
[MIT](https://github.com/ItsJimi/store-data/blob/master/LICENSE)
