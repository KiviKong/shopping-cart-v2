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
    return Promise.reject({
      path: 'user',
      message: 'not found'
    });
  }

  return user;
};

module.exports = getUsers;
