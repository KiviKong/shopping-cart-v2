const { Session, User } = require('../../../models');

module.exports = async function(root, args, context) {
  const query = {
    where: {
      token: context.session.token
    },
    include:[ {
      model: User,
      as: 'User'
    } ]
  };

  const session = await Session.findOne(query);

  return {
    token: session.token,
    expirationDate: session.expirationDate.toISOString(),
    user: session.User.getRaw()
  };
};
