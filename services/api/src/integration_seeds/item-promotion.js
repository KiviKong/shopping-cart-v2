const { ItemPromotion } = require('../api/models');
const data = require('/var/lib/core/integration_fixtures/item_promotion');

module.exports = {
  run: async() => {
    return await ItemPromotion.bulkCreate(data);
  }
};
