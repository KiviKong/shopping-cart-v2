const { request, errors } = require('../../../../test/common/fixtures/');
const { guid } = request;
const sendError = errors.customError('Session');
const token = 'token';

module.exports = {
  context: {
    guid,
    session: {
      token
    }
  },
  args: { },
  destroyParams: [
    {
      where: {
        token
      }
    }
  ],
  response: {
    success: true
  },
  error: sendError
};
