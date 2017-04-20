var fs = require('fs')

var documents = {}
var save = false
var directory = ''
var init = false

module.exports = {
  init: (config) => {
    if (init) {
      console.error('Init function cannot be called several times')
      return false
    }

    init = true
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
        try {
          documents[document] = JSON.parse(file.toString())
        } catch (e) {
          console.error('Database file are corrupted')
          return false
        }
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
    if (!init) {
      console.error('Database must be initialized')
      return false
    }
    if (!documents || !documents[document]) {
      console.error('Document doesn\'t exist')
      return false
    }

    return documents[document][key]
  },
  set: (document, key, value) => {
    if (!init) {
      console.error('Database must be initialized')
      return false
    }
    if (!documents || !documents[document]) {
      console.error('Document doesn\'t exist')
      return false
    }

    documents[document][key] = value
    if (save) {
      fs.writeFile(`${directory}/${document}.db`, JSON.stringify(documents[document]), err => {
        if (err) {
          console.error(err)
          return false
        }
      })
    }
    return true
  },
  del: (document, key) => {
    if (!init) {
      console.error('Database must be initialized')
      return false
    }
    if (!documents || !documents[document]) {
      console.error('Document doesn\'t exist')
      return false
    }

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
    if (!init) {
      console.error('Database must be initialized')
      return false
    }
    if (!documents || (document && !documents[document])) {
      console.error('Document doesn\'t exist')
      return false
    }

    if (document) {
      fs.writeFile(`${directory}/${document}.db`, JSON.stringify(documents[document]), err => {
        if (err) {
          console.error(err)
          return false
        }
      })
      return true
    }

    var keys = Object.keys(documents)
    keys.forEach(key => {
      fs.writeFile(`${directory}/${key}.db`, JSON.stringify(documents[key]), err => {
        if (err) console.error(err)
      })
    })
  },
  test: () => {
    // console.log('test')
  }
}
