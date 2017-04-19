var fs = require('fs')

var documents = {}
var save = false
var directory = ''

module.exports = {
  init: (config) => {
    if (!config.save) {
      config.documents.forEach(document => {
        documents[document] = {}
      })
      return true
    }

    directory = config.directory

    if (!fs.existsSync(config.directory)) {
      fs.mkdirSync(config.directory)
    }

    config.documents.forEach(document => {
      if (!fs.existsSync(`${config.directory}/${document}.db`)) {
        fs.writeFileSync(`${config.directory}/${document}.db`, '{}')
        documents[document] = {}
      } else {
        var file = fs.readFileSync(`${config.directory}/${document}.db`)
        documents[document] = JSON.parse(file.toString())
      }
    })

    if (config.save === true) {
      save = true
      return true
    }

    if (config.save > 0) {
      var keys = Object.keys(documents)
      setInterval(() => {
        keys.forEach(key => {
          fs.writeFile(`${config.directory}/${key}.db`, JSON.stringify(documents[key]), err => {
            if (err) console.log(err)
          })
        })
      }, config.save)
    }
    return true
  },
  get: (document, key) => {
    if (documents && documents[document]) {
      return documents[document][key]
    }
    return false
  },
  set: (document, key, value) => {
    if (!documents[document]) {
      return false
    }
    documents[document][key] = value
    if (save) {
      fs.writeFile(`${directory}/${document}.db`, JSON.stringify(documents[document]), err => {
        if (err) return err
      })
    }
    return true
  },
  del: (document, key) => {
    delete documents[document][key]

    if (!documents[document]) {
      documents[document] = {}
    }

    if (save) {
      fs.writeFile(`${directory}/${document}.db`, '{}', err => {
        if (err) return err
      })
    }
    return true
  },
  save: (document) => {
    if (document) {
      fs.writeFile(`${directory}/${document}.db`, JSON.stringify(documents[document]), err => {
        if (err) return console.log(err)
      })
      return
    }

    var keys = Object.keys(documents)
    keys.forEach(key => {
      fs.writeFile(`${directory}/${key}.db`, JSON.stringify(documents[key]), err => {
        if (err) console.log(err)
      })
    })
  },
  test: () => {
    // console.log('test')
  }
}
