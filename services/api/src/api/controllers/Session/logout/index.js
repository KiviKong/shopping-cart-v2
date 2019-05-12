const { Session } = require('../../../models');

module.exports = async function(root, args, context) {

  await Session.destroy({
    where: {
      token: context.session.token
    }
  });

  return {
    success: true
  };
};
