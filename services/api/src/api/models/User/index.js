const fs = require('fs');
const User = {
  options: {}
};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    User.options[directory] = require('./' + directory);
  });

module.exports = User;
