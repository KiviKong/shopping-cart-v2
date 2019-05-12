const { User } = require('../api/models');
const userData = require('/var/lib/core/integration_fixtures/user');

module.exports = {
  run: async() => {
    return await Promise.all(userData.map(async user => User.create(user)));
  }
};
