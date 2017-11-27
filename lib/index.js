'use strict'
const fs = require('fs')

class Store {
  constructor (config) {
    this.documents = {}
    this.config = config

    if (!this.config.save) return

    if (!this.config.directory) throw new Error('Directory must be specified when save = [true | number]')
    if (!this.config.name) throw new Error('Name must be specified when save = [true | number]')

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
        if (!this.config.recovering) throw new Error('Database file is corrupted')

        fs.renameSync(`${this.config.directory}/${this.config.name}.db`, `${this.config.directory}/${this.config.name}.db.${Math.floor(new Date())}`)
        fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, '{}')
      }
    }

    if (typeof this.config.save === 'number' && this.config.save > 0) {
      setInterval(() => {
        fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
          if (err) console.log(err)
        })
      }, this.config.save)
    }
  }

  get (key) {
    return new Promise((resolve, reject) => {
      return resolve(this.documents[key])
    })
  }

  getSync (key) {
    return this.documents[key]
  }

  set (key, value) {
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

  update (key, value) {
    return new Promise((resolve, reject) => {
      if (!this.documents || !this.documents[key]) return reject(new Error(`${key} doesn't exist`))

      if (typeof value === 'object' && !Array.isArray(value)) {
        for (let newkey in value) {
          this.documents[key][newkey] = value[newkey]
        }
      } else {
        this.documents[key] = value
      }

      if (this.config.save !== true) return resolve()
      fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
        if (err) return reject(err)

        return resolve()
      })
    })
  }

  updateSync (key, value) {
    if (!this.documents || !this.documents[key]) return

    if (typeof value === 'object' && !Array.isArray(value)) {
      for (let newkey in value) {
        this.documents[key][newkey] = value[newkey]
      }
    } else {
      this.documents[key] = value
    }

    if (this.config.save !== true) return
    fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents))
  }

  delete (key) {
    return new Promise((resolve, reject) => {
      if (!this.documents[key]) return resolve()

      delete this.documents[key]
      if (this.config.save !== true) return resolve()

      if (Object.keys(this.documents).length === 1) this.documents = {}
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

    if (Object.keys(this.documents).length === 1) this.documents = {}
    fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents))
  }

  list () {
    return new Promise((resolve, reject) => {
      if (!this.documents || typeof this.documents !== 'object') return reject(new Error(`Can't get keys of store.`))

      return resolve(Object.keys(this.documents))
    })
  }

  listSync () {
    if (!this.documents || typeof this.documents !== 'object') throw new Error(`Can't get keys of store.`)

    return Object.keys(this.documents)
  }

  find () {
    // Todo
  }

  findSync () {
    // Todo
  }
}

module.exports = Store
