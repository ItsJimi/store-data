var fs = require('fs');

var storage = new Map();

module.exports = {
  init: (config, callback) => {
    var directories = fs.readdirSync('.');
    if (directories.indexOf(config.directory) === -1) {
      fs.mkdirSync(config.directory);
      config.documents.forEach(name => {
        fs.writeFileSync(`${config.directory}/${name}.db`, '');
        storage.set(name, new Map());
      });
      return true;
    }
    config.documents.forEach(name => {
      if (!fs.existsSync(`${config.directory}/${name}.db`)) {
        fs.writeFileSync(`${config.directory}/${name}.db`, '');
      }
      var file = fs.readFileSync(`${config.directory}/${name}.db`);
      storage.set(name, new Map(file));
    });
    setInterval(() => {
      console.log('----');
      for (var document of storage) {
        console.log(document);
        fs.writeFile(`${config.directory}/${document}.db`, global.uneval([...storage.get(document)]));
      }
    }, 1000);
    return true;
  },
  get: (document, key) => {
    return storage.get(document).get(key);
  },
  set: (document, key, value) => {
    storage.set(document).set(key, value);
    return true;
  },
  keys: () => {
    return storage.keys();
  }
};
