const utils = require('../../../../helpers/utils');
const beforeCreate = async function(instance) {
  const hash = utils.encrypt(instance.password);

  instance.password = hash;
  return instance;
};

module.exports = beforeCreate;
