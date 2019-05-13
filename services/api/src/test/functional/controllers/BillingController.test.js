const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const API = require('../helpers/api');
const validate = require('../helpers/validate');

const errorCodes = require('../../../config/error-codes');

const billingFixtures = require('../fixtures/billing/billing');
const errorSchema = require('../schemas/error');

chai.use(chaiAsPromised);

describe('functional/Billing controller', () => {
  describe('calculateBillingAmount', () => {

    beforeEach(() => {
      if (!API.isLoggedIn()) {
        return API.adminLogin();
      }

      return Promise.resolve();
    });

    it('should return an error if user is not logged in', () => {

      return API.logout()
        .then(() => API.calculateBillingAmount(billingFixtures.standarCart))
        .should.be.fulfilled
        .then(response => {
          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('user');
          errorData.code.should.be.eql(errorCodes.Session.Unauthorized);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an error if user is not autorized', () => {

      return API.logout()
        .then(() => API.clientLogin())
        .then(() => API.calculateBillingAmount(billingFixtures.standarCart))
        .should.be.fulfilled
        .then(response => {
          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('user');
          errorData.code.should.be.eql(errorCodes.Session.Unauthorized);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an error if cart is empty', () => {

      return API.calculateBillingAmount(billingFixtures.emptyCart)
        .should.be.fulfilled
        .then(response => {
          const errorData = response.data.errors[0];

          response.status.should.be.eql(200);
          errorData.path.should.be.eql('items');
          errorData.code.should.be.eql(errorCodes.Server.InvalidRequest);
          return validate(errorSchema)(errorData);
        });
    });

    it('should return an successful response', () => {

      return API.calculateBillingAmount(billingFixtures.standarCart)
        .should.be.fulfilled
        .then(response => {
          const billingSchema = require('../schemas/billing');
          const billing = response.data.data;

          response.status.should.be.eql(200);
          return validate(billingSchema)(billing.calculateBillingAmount);
        });
    });
  });
});
