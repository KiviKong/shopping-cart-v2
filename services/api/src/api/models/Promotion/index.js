const fs = require('fs');
const Promotion = {
  options: {}
};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    Promotion.options[directory] = require('./' + directory);
  });

module.exports = Promotion;
