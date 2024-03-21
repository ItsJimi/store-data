# store-data
[![Test](https://github.com/ItsJimi/store-data/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/ItsJimi/store-data/actions/workflows/test.yml)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/l/store-data.svg)](https://github.com/ItsJimi/store-data/blob/master/LICENSE)

Finally, the simplest way to store data

## Features
- 🌞 Very simple
- 🧷 Sync & Async
- 💡 Types included

## Install
```
npm i store-data
```

## Examples
See [typescript](https://github.com/ItsJimi/store-data/blob/main/examples/advance.ts) and [javascript](https://github.com/ItsJimi/store-data/blob/main/examples/basic.js) examples [here](https://github.com/ItsJimi/store-data/tree/main/examples).

```javascript
const Store = require('store-data')

const users = new Store({
  save: false
})

await users.set('id-1', { name: 'Jimi', dev: true })
const user = await users.get('id-1')
console.log(user) // { name: 'Jimi', dev: true }
```

## Docs
All functions are documented with jsdoc on [store-data website](https://itsjimi.github.io/store-data).

## Contribute
Feel free to fork and make pull requests

## License
[MIT](https://github.com/ItsJimi/store-data/blob/master/LICENSE)
