
const randtoken = require('rand-token');
const beforeCreate = async function(instance) {
  instance.expirationDate = await instance.defineExpiration(instance.role);
  instance.token = randtoken.generate(16);
  return instance;
};

module.exports = beforeCreate;
