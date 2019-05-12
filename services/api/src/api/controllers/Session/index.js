const fs = require('fs');
const path = require('path');
const Session = {};

fs.readdirSync(__dirname)
  .filter(i => fs.statSync(path.join(`${__dirname}/`, i)).isDirectory())
  .filter(i => fs.existsSync(path.join(`${__dirname}/`, i)))
  .forEach(directory => {
    Session[directory] = require('./' + directory);
  });

module.exports = Session;
