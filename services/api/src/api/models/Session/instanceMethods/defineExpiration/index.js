const utils = require('../../../../helpers/utils');
const defineExpiration = async function(role) {
  const time = {
    ADMIN: 45,
    CLIENT: 20
  };

  return utils.expirationTime(time[role]);
};

module.exports = defineExpiration;
