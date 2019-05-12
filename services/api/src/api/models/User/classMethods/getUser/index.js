const getUsers = async function(userId, email = false) {
  const { User } = require('../../../../models');

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
