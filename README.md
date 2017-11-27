# store-data
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/l/store-data.svg)](https://github.com/ItsJimi/store-data/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/ItsJimi/store-data.svg?branch=master)](https://travis-ci.org/ItsJimi/store-data)
[![Dependency](https://david-dm.org/ItsJimi/store-data.svg)](https://david-dm.org/ItsJimi/store-data)
[![DevDependency](https://david-dm.org/ItsJimi/store-data/dev-status.svg)](https://david-dm.org/ItsJimi/store-data?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/ItsJimi/store-data/badge.svg?branch=master)](https://coveralls.io/github/ItsJimi/store-data?branch=master)

[![NPM](https://nodei.co/npm/store-data.png?compact=true)](https://nodei.co/npm/store-data/)

Finally, the simplest way to store data

## Install
```
npm i store-data
```

## Example
```javascript
const Store = require('store-data')

const users = new Store({
  save: false
})

users.setSync('user123', {
  name: 'Jimi',
  dev: true
})

console.log(users.getSync('user123'))
// { name: 'Jimi', dev: true }
```
or
```javascript
const Store = require('store-data')

const users = new Store({
  save: false
})

users.set('user123', {
  name: 'Jimi',
  dev: true
}).then(() => {
  users.get('user123').then(value => {
    console.log(value)
    // { name: 'Jimi', dev: true }
  })
})
```

## Docs
All functions are documented with jsdoc on [store-data website](https://itsjimi.github.io/store-data).

## Contribute
Feel free to fork and make pull requests

## License
[MIT](https://github.com/ItsJimi/store-data/blob/master/LICENSE)
