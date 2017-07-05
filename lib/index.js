'use strict'
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
          throw new Error('Database file is corrupted')
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
    return new Promise((resolve, reject) => {
      return resolve(this.documents[key])
    })
  }

  getSync (key) {
    return this.documents[key]
  }

  set (key, value, cb) {
    return new Promise((resolve, reject) => {
      this.documents[key] = value

      if (this.config.save !== true) return resolve()
      fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
        if (err) return reject(err)

        return resolve()
      })
    })
  }

  setSync (key, value) {
    this.documents[key] = value

    if (this.config.save !== true) return
    fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents))
  }

  delete (key, cb) {
    return new Promise((resolve, reject) => {
      if (!this.documents[key]) return resolve()

      delete this.documents[key]
      if (this.config.save !== true) return resolve()

      fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
        if (err) return reject(err)

        return resolve()
      })
    })
  }

  deleteSync (key) {
    if (!this.documents[key]) return

    delete this.documents[key]
    if (this.config.save !== true) return

    fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents))
  }

  find () {
    // Todo
  }

  findSync () {
    // Todo
  }
}

module.exports = Store
