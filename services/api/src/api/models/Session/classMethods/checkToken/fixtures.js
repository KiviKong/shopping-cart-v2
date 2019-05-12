const { request, errors } = require('../../../../../test/common/fixtures');
const { token } = request;
const { commonError } = errors;

const date = new Date();

module.exports = {
  findOneParams: [ {
    where: {
      token
    }
  } ],
  token,
  validSession: {
    expirationDate: date.setMinutes(date.getMinutes() + 30),
    defineExpiration: () => {
      return;
    },
    save: () => {
      return;
    }
  },
  invalidSession: {
    expirationDate: date.setMinutes(date.getMinutes() - 60),
    save: () => {
      return;
    }
  },
  commonError,
  expiredError: {
    path: 'token',
    message: 'Token expired'
  }
};
