const { Session } = require(process.env.MODELS_PATH);

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
