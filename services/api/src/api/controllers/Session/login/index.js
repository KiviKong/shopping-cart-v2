const { Session } = require(process.env.MODELS_PATH);

module.exports = async function(root, { input }) {
  const session = await Session.verifyAndCreate(input.email, input.password);

  return {
    token: session.token,
    expirationDate: session.expirationDate.toISOString(),
    user: await session.User.getRaw()
  };
};
