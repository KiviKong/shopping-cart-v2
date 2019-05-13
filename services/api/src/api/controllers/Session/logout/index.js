const { Session } = require(process.env.MODELS_PATH);

module.exports = async function(root, args, context) {
  try {
    await Session.destroy({
      where: {
        token: context.session.token
      }
    });

    return {
      success: true
    };
  } catch (err) {
    throw err;
  }
};
