const { request, errors } = require('../../../../../test/common/fixtures');
const { commonError } = errors;
const { email } = request;
const password = '1234567890';

module.exports = {
  email,
  password: password,
  user: {
    email,
    password: password
  },
  compareParams: [
    password,
    password
  ],
  userQuery: [ {
    where: {
      email
    }
  } ],
  commonError
};
