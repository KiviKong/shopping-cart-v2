const { Item } = require('../../../models');
const { promotionsLogic } = require('../../../helpers/utils');

module.exports = async function(root, { input }) {
  const { items } = input;
  const response = { items: [] };
  const pieces = {};
  const codes = [];
  let total = 0;
  let discount = 0;

  for (let i = 0, len = items.length; i < len; i++) {
    codes.push(items[i].code);
    pieces[items[i].code] = items[i].pieces;
  }

  try {
    const ItemsInstance = await Item.getItems(codes);

    for (let i = 0, len = ItemsInstance.length; i < len; i++) {
      const itemFormated = ItemsInstance[i].getRaw(pieces[ItemsInstance[i].code]);

      total += pieces[ItemsInstance[i].code] * ItemsInstance[i].price;
      discount += promotionsLogic[itemFormated.promotion](pieces[itemFormated.code], ItemsInstance[i].price);
      response.items.push(itemFormated);
    }
  } catch (err) {
    throw err;
  }

  response.total = total;
  response.discount = discount;
  response.totalAfterDiscount = total - discount;

  return response;
};
