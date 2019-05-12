const UserSeeds = require('./user');
const ItemSeeds = require('./item');
const PromotionSeeds = require('./promotion');
const ItemPromotion = require('./item-promotion');
const CleanUpSeeds = require('./cleanup');
const { sequelize } = require('../api/models');
const logger = new (require('/var/lib/core/js/log'))(module);

async function integrationSeeds() {
  try {
    const date = new Date().toISOString();

    logger.message('Cleaning DB', '', 'seeder', date);

    await CleanUpSeeds.run();

    logger.message('Start insertions', '', 'seeder', date);

    await UserSeeds.run();
    await ItemSeeds.run();
    await PromotionSeeds.run();
    await ItemPromotion.run();

    logger.message('DB ready', '', 'seeder', date);

    return await sequelize.close();
  } catch (err) {
    console.log(err);

    return true;
  }
}

integrationSeeds();
