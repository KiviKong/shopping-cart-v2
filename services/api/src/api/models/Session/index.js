const fs = require('fs');
const Session = {
  options: {}
};

fs.readdirSync(__dirname)
  .filter(directory => !directory.includes('.js'))
  .forEach(directory => {
    Session.options[directory] = require('./' + directory);
  });

module.exports = Session;
