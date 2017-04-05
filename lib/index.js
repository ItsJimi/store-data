var fs = require('fs');

var storage = [];

module.exports = {
  init: (config, callback) => {
    var directories = fs.readdirSync('.');
    if (directories.indexOf(config.directory) === -1) {
      fs.mkdirSync(config.directory);
      config.documents.forEach(name => {
        fs.writeFileSync(`${config.directory}/${name}.db`, '');
        storage[name] = new Map();
      });
      return true;
    }
    config.documents.forEach(name => {
      if (!fs.existsSync(`${config.directory}/${name}.db`)) {
        fs.writeFileSync(`${config.directory}/${name}.db`, '');
      }
      var file = fs.readFileSync(`${config.directory}/${name}.db`);
      storage[name] = new Map(file);
    });
    setInterval(() => {
      // console.log('----');
      // console.log(storage);
      storage.forEach((document) => {
        console.log('document');
        // fs.writeFileSync(`${config.directory}/${}.db`);
      });
    }, 1000);
    return true;
  },
  get: (document, key) => {
    return storage[document].get(key);
  },
  set: (document, key, value) => {
    storage[document].set(key, value);
    return true;
  }
};
