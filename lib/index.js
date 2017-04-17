var fs = require('fs')

var documents = {}

module.exports = {
  init: (config, callback) => {
    var directories = fs.readdirSync('.')
    if (directories.indexOf(config.directory) === -1) {
      fs.mkdirSync(config.directory)
      config.documents.forEach(document => {
        fs.writeFileSync(`${config.directory}/${document}.db`, '{}')
        documents[document] = {}
      })
      return true
    }
    config.documents.forEach(document => {
      if (!fs.existsSync(`${config.directory}/${document}.db`)) {
        fs.writeFileSync(`${config.directory}/${document}.db`, '{}')
      }
      var file = fs.readFileSync(`${config.directory}/${document}.db`)
      documents[document] = JSON.parse(file.toString())
    })
    if (config.save !== false) {
      var keys = Object.keys(documents)
      setInterval(() => {
        keys.forEach((key) => {
          fs.writeFile(`${config.directory}/${key}.db`, JSON.stringify(documents[key]), (err) => {
            if (err) console.log(err)
          })
        })
      }, config.save)
    }
    return true
  },
  get: (document, key) => {
    return documents[document][key]
  },
  set: (document, key, value) => {
    documents[document][key] = value
    return true
  },
  test: () => {
    // console.log('test')
  }
}
