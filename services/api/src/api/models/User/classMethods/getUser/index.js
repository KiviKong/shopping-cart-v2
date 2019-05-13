const getUsers = async function(userId, email = false) {
  const { User } = require(process.env.MODELS_PATH);

  let options = {
    where: {
      id: userId
    }
  };

  if (email) {
    options = {
      where: {
        email: email
      }
    };
  }

  const user = await User.findOne(options);

  if (!user) {
    const error = {
      path: 'user',
      message: 'not found'
    };

    throw error;
  }

  return user;
};

module.exports = getUsers;
