const bcrypt = require('bcryptjs');
const verify = async function(email, password, userId) {
  const { User } = require(process.env.MODELS_PATH);
  const query = {
    where: {
      email
    }
  };

  if (!email && userId) {
    query.where = {
      id: userId
    };
  }

  const user = await User.findOne(query);

  if (!user) {
    return Promise.reject();
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return Promise.reject();
  }

  return user;
};

module.exports = verify;
