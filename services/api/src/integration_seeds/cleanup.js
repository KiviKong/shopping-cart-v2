const { sequelize } = require('../api/models');

module.exports = {
  run: async() => {
    await sequelize.query('DELETE FROM sessions');
    await sequelize.query('DELETE FROM users');
    await sequelize.query('DELETE FROM items_promotions');
    await sequelize.query('DELETE FROM items');
    await sequelize.query('DELETE FROM promotions');
  }
};
