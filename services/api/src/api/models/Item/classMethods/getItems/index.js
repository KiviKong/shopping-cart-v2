const getItems = async function(codes) {
  const { Item, Promotion } = require('../../../../models');

  const query = {
    where: {
      code: codes
    },
    include: [
      {
        model: Promotion,
        as: 'Promotion'
      }
    ]
  };

  return await Item.findAll(query);
};

module.exports = getItems;
