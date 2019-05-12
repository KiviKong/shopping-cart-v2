const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  expirationTime: (time) => {
    const today = new Date();

    today.setMinutes(today.getMinutes() + time);
    return today;
  },
  encrypt(value) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(value, salt);

    return hash;
  }
};
