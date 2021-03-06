'use strict'
const fs = require('fs')

/**
 * Class representing the store
 * */
class Store {
  /**
   * Create a store
   * @param {Object} config - Options to init new Store
   * @param {(bool|number)} config.save - If save is number, store save data every number seconds
   * @param {string} config.directory - Path who stores are saved
   * @param {string} config.name - Name of file when save = true
   */
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

  /**
   * [Promise] Get value
   * @param {string} key - Key
   * @returns {any} - Return value of key
   */
  get (key) {
    return new Promise((resolve, reject) => {
      return resolve(this.documents[key])
    })
  }

  /**
   * Get value
   * @param {string} key - Key
   * @returns {any} - Return value of key
   */
  getSync (key) {
    return this.documents[key]
  }

  /**
   * [Promise] Set value
   * @param {string} key - Key
   * @param {any} value - Value
   */
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

  /**
   * Set value
   * @param {string} key - Key
   * @param {any} value - Value
   */
  setSync (key, value) {
    this.documents[key] = value

    if (this.config.save !== true) return
    fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents))
  }

  /**
   * [Promise] Update value
   * @param {string} key - Key
   * @param {any} value - Value
   */
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

  /**
   * Update value
   * @param {string} key - Key
   * @param {any} value - Value
   */
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

  /**
   * [Promise] Delete value
   * @param {string} key - Key
   */
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

  /**
   * Delete value
   * @param {string} key - Key
   */
  deleteSync (key) {
    if (!this.documents[key]) return

    delete this.documents[key]
    if (this.config.save !== true) return

    if (Object.keys(this.documents).length === 1) this.documents = {}
    fs.writeFileSync(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents))
  }

  /**
   * [Promise] Get list of key
   * @returns {Array} - Return list of keys
   */
  list () {
    return new Promise((resolve, reject) => {
      if (!this.documents || typeof this.documents !== 'object') return reject(new Error(`Can't get keys of store.`))

      return resolve(Object.keys(this.documents))
    })
  }

  /**
   * Get list of key
   * @returns {Array} - Return list of keys
   */
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
