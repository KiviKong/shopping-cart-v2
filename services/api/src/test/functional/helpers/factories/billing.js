const formatHelper = require('../formatHelpers');

class BillingFactory {
  calculateBillingAmount(params) {
    const { items } = params;
    const input = {
      items: formatHelper.formatArrayValue(items, 'items')
    };

    return {
      query: `
        query {
          calculateBillingAmount(input: {
           ${input.items}
          }) {
            items {
              code,
              price,
              pieces,
              promotion
            },
            total,
            discount,
            totalAfterDiscount
          }
        }`
    };
  }
}

module.exports = new BillingFactory();
