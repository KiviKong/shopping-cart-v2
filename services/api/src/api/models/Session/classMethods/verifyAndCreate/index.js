const verifyAndCreate = async function(email, password) {
  const { Session, User } = require(process.env.MODELS_PATH);

  try {
    const user = await User.verify(email, password);

    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role
    };

    const session = await Session.create(sessionData);

    session.User = user;

    return session;
  } catch (err) {
    const error = {
      path: 'email or password',
      message: 'email or password doesn\'t match'
    };

    return Promise.reject(err || error);
  }
};

module.exports = verifyAndCreate;
