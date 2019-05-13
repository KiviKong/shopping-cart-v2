const fs = require('fs');
const path = require('path');
const Billing = {};

fs.readdirSync(__dirname)
  .filter(i => fs.statSync(path.join(`${__dirname}/`, i)).isDirectory())
  .filter(i => fs.existsSync(path.join(`${__dirname}/`, i)))
  .forEach(directory => {
    Billing[directory] = require('./' + directory);
  });

module.exports = Billing;
