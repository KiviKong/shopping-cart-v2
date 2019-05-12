const UserSeeds = require('./user');
const CleanUpSeeds = require('./cleanup');
const { sequelize } = require('../api/models');

async function integrationSeeds() {
  try {
    await CleanUpSeeds.run();
    await UserSeeds.run();
    return await sequelize.close();
  } catch (err) {
    console.log(err);

    return true;
  }
}

integrationSeeds();
