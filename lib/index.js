const fs = require('fs')

class Store {
  constructor (config) {
    this.documents = {}
    this.config = config

    if (!this.config.save) return

    if (!fs.existsSync(this.config.directory)) {
      fs.mkdirSync(this.config.directory)
    }

    if (!fs.existsSync(`${this.config.directory}/${this.config.name}.db`)) {
      fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, '{}')
    } else {
      const file = fs.readFileSync(`${this.config.directory}/${this.config.name}.db`)
      try {
        this.documents = JSON.parse(file.toString())
      } catch (e) {
        if (!this.config.recovering) {
          putError('Database file is corrupted')
          return false
        }
        fs.renameSync(`${this.config.directory}/${this.config.name}.db`, `${this.config.directory}/${this.config.name}.db.` + Math.floor(new Date()))
        fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, '{}')
      }
    }

    if (this.config.save && this.config.save > 0) {
      setInterval(() => {
        fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
          if (err) console.log(err)
        })
      }, this.config.save)
    }
  }

  get (key, cb) {
    return cb(null, this.documents[key])
  }

  set (key, value, cb) {
    this.documents[key] = value

    if (this.config.save !== true) return cb()

    fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
      if (err) return putError(err)

      return cb()
    })
  }

  delete (key, cb) {
    if (this.document[key]) {
      delete this.document[key]
      if (this.config.save === true) {
        fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
          if (err) return putError(err)

          return cb()
        })
      }
    }
  }
}

module.exports = Store
