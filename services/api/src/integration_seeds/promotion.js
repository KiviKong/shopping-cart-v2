const { Promotion } = require('../api/models');
const data = require('/var/lib/core/integration_fixtures/promotion');

module.exports = {
  run: async() => {
    return await Promotion.bulkCreate(data);
  }
};
