const { Session, User } = require(process.env.MODELS_PATH);

module.exports = async function(root, args, context) {
  try {
    const query = {
      where: {
        token: context.session.token
      },
      include: [ {
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
  } catch (err) {
    throw err;
  }
};
