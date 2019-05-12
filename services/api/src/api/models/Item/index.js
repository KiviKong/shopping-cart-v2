const fs = require('fs');
const Item = {
  options: {}
};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    Item.options[directory] = require('./' + directory);
  });

module.exports = Item;
