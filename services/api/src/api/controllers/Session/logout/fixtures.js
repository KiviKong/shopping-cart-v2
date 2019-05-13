const { request, errors } = require(process.env.COMMON_FIXTURES_PATH);
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
