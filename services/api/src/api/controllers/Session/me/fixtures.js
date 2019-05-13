const { errors } = require(process.env.COMMON_FIXTURES_PATH);
const sendError = errors.customError('Session');
const { User } = require(process.env.MODELS_PATH);

const expirationDate = new Date();
const token = 'token';
const user = {
  id: 1,
  name: 'A name complete',
  email: 'some@email.com',
  role: 'ADMIN_US',
  verified: true
};
const sessionInstance = {
  token,
  expirationDate,
  User: {
    getRaw: () => {
      return;
    }
  }
}

module.exports = {
  context: {
    session: {
      token
    }
  },
  findOneParams: [ {
    where: {
      token: token
    },
    include: [ {
      model: User,
      as: 'User'
    } ]
  } ],
  args: { },
  user,
  sessionInstance,
  response: {
    token,
    expirationDate: expirationDate.toISOString(),
    user
  },
  error: sendError
};
