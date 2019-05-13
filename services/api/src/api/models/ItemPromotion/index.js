const fs = require('fs');
const ItemPromotion = {
  options: {}
};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    ItemPromotion.options[directory] = require('./' + directory);
  });

module.exports = ItemPromotion;
