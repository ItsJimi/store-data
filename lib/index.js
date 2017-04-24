var fs = require('fs')

var documents = {}
var c = {}
var init = false

module.exports = {
  init: (config) => {
    if (init) {
      putError('Init function cannot be called several times')
      return false
    }

    c = config
    init = true

    if (!config.save) {
      config.documents.forEach(document => {
        documents[document] = {}
      })
      return true
    }

    if (!config.directory) {
      return putError('With saving configuration, directory can\'t be undefined')
    }

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
          if (!c.recovering) {
            putError('Database file is corrupted')
            return false
          }
          fs.renameSync(`${config.directory}/${document}.db`, `${config.directory}/${document}.db.` + Math.floor(new Date()))
          fs.writeFileSync(`${config.directory}/${document}.db`, '{}')
          documents[document] = {}
        }
      }
    })

    if (config.save === true) {
      c.save = true
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
      putError('Database must be initialized')
      return false
    }
    if (!documents || !documents[document]) {
      putError('Document doesn\'t exist')
      return false
    }

    return documents[document][key]
  },
  set: (document, key, value) => {
    if (!init) {
      putError('Database must be initialized')
      return false
    }
    if (!documents || !documents[document]) {
      putError('Document doesn\'t exist')
      return false
    }

    documents[document][key] = value
    if (c.save === true) {
      fs.writeFile(`${c.directory}/${document}.db`, JSON.stringify(documents[document]), err => {
        if (err) {
          putError(err)
          return false
        }
      })
    }
    return true
  },
  del: (document, key) => {
    if (!init) {
      putError('Database must be initialized')
      return false
    }
    if (!documents || !documents[document]) {
      putError('Document doesn\'t exist')
      return false
    }

    delete documents[document][key]

    if (!documents[document]) {
      documents[document] = {}
    }

    if (c.save === true) {
      fs.writeFile(`${c.directory}/${document}.db`, '{}', err => {
        if (err) return err
      })
    }
    return true
  },
  save: (document) => {
    if (!init) {
      putError('Database must be initialized')
      return false
    }
    if (!documents || (document && !documents[document])) {
      putError('Document doesn\'t exist')
      return false
    }

    if (document) {
      fs.writeFile(`${c.directory}/${document}.db`, JSON.stringify(documents[document]), err => {
        if (err) {
          putError(err)
          return false
        }
      })
      return true
    }

    var keys = Object.keys(documents)
    keys.forEach(key => {
      fs.writeFile(`${c.directory}/${key}.db`, JSON.stringify(documents[key]), err => {
        if (err) putError(err)
      })
    })
  },
  test: () => {
    // console.log('test')
  }
}

var putError = (str) => {
  if (c.error === true) {
    throw (str)
  } else if (c.verbose === true) {
    putError(str)
  }
}
