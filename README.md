# store-data
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/l/store-data.svg)](https://github.com/ItsJimi/store-data/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/ItsJimi/store-data.svg?branch=master)](https://travis-ci.org/ItsJimi/store-data)
[![Dependency](https://david-dm.org/ItsJimi/store-data.svg)](https://david-dm.org/ItsJimi/store-data)
[![DevDependency](https://david-dm.org/ItsJimi/store-data/dev-status.svg)](https://david-dm.org/ItsJimi/store-data?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/ItsJimi/store-data/badge.svg?branch=master)](https://coveralls.io/github/ItsJimi/store-data?branch=master)

[![NPM](https://nodei.co/npm/store-data.png?compact=true)](https://nodei.co/npm/store-data/)

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
  save: false // false, true or number in millisecond
})

store.set('users', 'abc123', {
  firstname: 'Jimi',
  lastname: 'blabla',
  test: true
})
console.log(store.get('users', 'abc123'))
```

## API

### init(options)
This function initialize database, it is required and be not called several times

#### option (Object)
- directory (String) Path
- documents (Array of string) Name of documents
- save (Boolean or Number) If ```number``` server save data every ```number``` seconds
- error (Boolean) If ```true``` errors crash the server
- verbose (Boolean) If ```true``` errors are print

### set(document, key, value)
This function set value in a document

- document (String)
- key (String)
- value (any)

### get(document, key)
This function get value of key

- document (String)
- key (String)

### del(document, key)
This function delete value and key

- document (String)
- key (String)

### save(document)
This function save in-memory storage in file system

- document (String) Optional, save all documents or ```document```

## Contribute
Feel free to fork and make pull requests

## License
[MIT](https://github.com/ItsJimi/store-data/blob/master/LICENSE)
