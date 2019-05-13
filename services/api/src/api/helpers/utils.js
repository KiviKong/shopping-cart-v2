const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  expirationTime: (time) => {
    const today = new Date();

    today.setMinutes(today.getMinutes() + time);
    return today;
  },
  encrypt: (value) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(value, salt);

    return hash;
  },
  promotionsLogic: {
    '2-for-1': (pieces, price) => {
      return Math.trunc(pieces / 2) * price;
    },
    'bulk': (pieces, price) => {
      return pieces >= 3 ? price * 0.05 * pieces : 0;
    },
    'N/A': () => 0
  }
};
