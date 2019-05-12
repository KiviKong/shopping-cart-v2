const { request, errors } = require('../../../../test/common/fixtures/');
const { guid } = request;
const sendError = errors.customError('Session');
const date = new Date();
const input = {
  email: 'some@email.com',
  password: 'some password'
};
const user = {
  id: 1,
  name: 'A name complete',
  email: input.email,
  role: 'ADMIN',
  verified: true
};
const response = {
  token: 'token',
  expirationDate: date.toISOString(),
  user
}
const sessionInstance = {
  token: response.token,
  expirationDate: date,
  User: {
    getRaw: () => {
      return;
    }
  }
};

module.exports = {
  context: {
    guid
  },
  args: {
    input
  },
  verifyAndCreateParams: [
    input.email,
    input.password
  ],
  user,
  response,
  sessionInstance,
  error: sendError
};
