const proxy = new (require('../../middleware/proxy'))('Billing');

const resolver = {
  Query: {
    calculateBillingAmount: proxy.calculateBillingAmount.authorized().validInput('billing/calculate-billing-amount')
  }
};

module.exports = resolver;
