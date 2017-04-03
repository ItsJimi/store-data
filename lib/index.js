var fs = require('fs');

var storage = [];

module.exports = {
  init: (config, callback) => {
    var directories = fs.readdirSync('.');
    if (directories.indexOf(config.directory) === -1) {
      fs.mkdirSync(config.directory);
      config.documents.forEach(name => {
        fs.writeFileSync(`${config.directory}/${name}.db`, '{}');
      });
      return 'done';
    }
    config.documents.forEach(name => {
      var file = fs.readFileSync(`${config.directory}/${name}.db`);
      if (file) {
        storage[name] = new Map();
        file = JSON.parse(file);
        Object.keys(file).forEach((key) => {
          storage[name].set(key, file[key]);
        });
      } else {
        fs.writeFileSync(`${config.directory}/${name}.db`, '{}');
      }
    });
    return 'test';
  },
  get: (document, key) => {
    return storage[document].get(key);
  }
};
