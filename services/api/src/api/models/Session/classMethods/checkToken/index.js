const checkToken = async function(token) {
  const { Session } = require(process.env.MODELS_PATH);

  const session = await Session.findOne({
    where: {
      token
    }
  });

  if (!session || new Date() >= session.expirationDate) {
    const error = {
      path: 'token',
      message: 'Token expired'
    };

    throw error;
  }

  session.expirationDate = await session.defineExpiration(session.role);
  return await session.save();
};

module.exports = checkToken;
