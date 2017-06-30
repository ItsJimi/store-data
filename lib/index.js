import fs from 'fs'

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
        fs.renameSync(`${this.config.directory}/${thius.config.name}.db`, `${this.config.directory}/${this.config.name}.db.` + Math.floor(new Date()))
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

  get (key) {
    return this.documents[key]
  }

  set (key, value, cb) {
    this.documents[key] = value
    if (this.config.save === true) {
      fs.writeFile(`${this.config.directory}/${this.config.name}.db`, JSON.stringify(this.documents), err => {
        if (err) return putError(err)

        return cb()
      })
    }
  }
}

export default Store

// module.exports = {
//   del: (document, key) => {
//     if (!init) {
//       putError('Database must be initialized')
//       return false
//     }
//     if (!documents || !documents[document]) {
//       putError('Document doesn\'t exist')
//       return false
//     }

//     delete documents[document][key]

//     if (!documents[document]) {
//       documents[document] = {}
//     }

//     if (c.save === true) {
//       fs.writeFile(`${c.directory}/${document}.db`, '{}', err => {
//         if (err) return err
//       })
//     }
//     return true
//   },
//   save: (document) => {
//     if (!init) {
//       putError('Database must be initialized')
//       return false
//     }
//     if (!documents || (document && !documents[document])) {
//       putError('Document doesn\'t exist')
//       return false
//     }

//     if (document) {
//       fs.writeFile(`${c.directory}/${document}.db`, JSON.stringify(documents[document]), err => {
//         if (err) {
//           putError(err)
//           return false
//         }
//       })
//       return true
//     }

//     var keys = Object.keys(documents)
//     keys.forEach(key => {
//       fs.writeFile(`${c.directory}/${key}.db`, JSON.stringify(documents[key]), err => {
//         if (err) putError(err)
//       })
//     })
//   },
//   test: () => {
//     // console.log('test')
//   }
// }

// var putError = (str) => {
//   if (c.error === true) {
//     throw (str)
//   } else if (c.verbose === true) {
//     putError(str)
//   }
// }
