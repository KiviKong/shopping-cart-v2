const { Item } = require('../api/models');
const data = require('/var/lib/core/integration_fixtures/item');

module.exports = {
  run: async() => {
    return await Item.bulkCreate(data);
  }
};
