const utils = require(`${process.env.HELPERS_PATH}/utils`);
const beforeCreate = async function(instance) {
  const hash = utils.encrypt(instance.password);

  instance.password = hash;
  return instance;
};

module.exports = beforeCreate;
