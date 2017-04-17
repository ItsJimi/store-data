var fs = require('fs')

var storage = []

module.exports = {
  init: (config, callback) => {
    var directories = fs.readdirSync('.')
    if (directories.indexOf(config.directory) === -1) {
      fs.mkdirSync(config.directory)
      config.documents.forEach(name => {
        fs.writeFileSync(`${config.directory}/${name}.db`, '{}')
        storage[name] = {}
      })
      return true
    }
    config.documents.forEach(name => {
      if (!fs.existsSync(`${config.directory}/${name}.db`)) {
        fs.writeFileSync(`${config.directory}/${name}.db`, '{}')
      }
      var file = fs.readFileSync(`${config.directory}/${name}.db`)
      storage[name] = JSON.parse(file.toString())
    })
    setInterval(() => {
      //
    }, 1000)
    return true
  },
  get: (document, key) => {
    return storage[document][key]
  },
  set: (document, key, value) => {
    storage[document][key] = value
    return true
  },
  keys: (document) => {
    return storage[document]
  }
}
