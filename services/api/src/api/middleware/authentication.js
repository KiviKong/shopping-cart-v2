const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;
const { Session, User } = require('../models');
const unauthorizedError = (error) => {
  return {
    path: 'user',
    message: 'Unauthorized',
    code: 101,
    error
  }
};

passport.use(new Strategy(
  async function(token, done) {
    try {
      const session = await Session.checkToken(token);
      const user = await User.getUser(session.userId);
      const response = {
        token: session.token,
        expirationDate: session.expirationDate.toISOString(),
        user: {
          id: session.userId,
          email: session.email,
          role: session.role,
          verified: user.verified
        }
      };

      return Promise.resolve(done(null, response));
    } catch (err) {
      return Promise.resolve(done(unauthorizedError(err)));
    }
  }
));

module.exports = function(context) {
  const request = context;

  return new Promise((resolve, reject) => {

    return passport.authenticate('bearer', { session: false }, (err, session) => {
      if (err || !session) {
        const error = err || unauthorizedError(err);

        return reject(error);
      }

      request.session = session;

      return resolve();
    })(request);
  });
};
