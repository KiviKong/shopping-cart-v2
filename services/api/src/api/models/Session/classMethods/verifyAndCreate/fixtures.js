const { errors } = require('../../../../../test/common/fixtures');
const { commonError } = errors;

const token = 'token';
const email = 'some@email.com';
const password = 'some password';
const userInstance = {
  id: 1,
  role: 'ADMIN_US',
  email,
  verified: true
};

module.exports = {
  email,
  password,
  verifyParams: [
    email,
    password
  ],
  userInstance,
  userNotVerified: {
    id: 2,
    email: 'notverified@email.com',
    role: 'ADMIN_US',
    verified: false
  },
  createParams: [ {
    userId: 1,
    email,
    role: 'ADMIN_US'
  } ],
  sessionInstance: {
    token,
    email
  },
  response: {
    User: userInstance,
    token,
    email
  },
  commonError,
  notVerifiedError: {
    path: 'user',
    message: 'Not verified'
  },
  wrongDataError: {
    path: 'email or password',
    message: 'email or password doesn\'t match'
  }
};
