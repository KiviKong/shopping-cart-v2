module.exports = {
  expirationTime: (time) => {
    const today = new Date();

    today.setMinutes(today.getMinutes() + time);
    return today;
  }
};
