const { sequelize } = require('../api/models');

module.exports = {
  run: async() => {
    await sequelize.query('DELETE FROM sessions');
    await sequelize.query('DELETE FROM users');
  }
};
