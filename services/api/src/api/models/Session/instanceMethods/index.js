const fs = require('fs');
const instanceMethods = {};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    instanceMethods[directory] = require('./' + directory);
  });

module.exports = instanceMethods;
