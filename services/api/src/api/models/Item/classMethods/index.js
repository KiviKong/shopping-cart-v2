const fs = require('fs');
const classMethods = {};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    classMethods[directory] = require('./' + directory);
  });

module.exports = classMethods;
