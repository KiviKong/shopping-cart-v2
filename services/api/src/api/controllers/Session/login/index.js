const { Session } = require('../../../models');

module.exports = async function(root, { input }, context) {
  const session = await Session.verifyAndCreate(input.email, input.password);
  
  return {
    token: session.token,
    expirationDate: session.expirationDate.toISOString(),
    user: await session.User.getRaw()
  };
};
