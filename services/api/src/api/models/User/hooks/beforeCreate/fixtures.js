const password = '1234567890';

module.exports = {
  instance: {
    password: password
  },
  salt: 'salt',
  genSaltParams: [ 10 ],
  hash: 'hashed',
  hashSyncParams: [ password, 'salt' ]
};
