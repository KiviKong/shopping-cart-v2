const fs = require('fs');
const hooks = {};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    hooks[directory] = require('./' + directory);
  });

module.exports = hooks;
