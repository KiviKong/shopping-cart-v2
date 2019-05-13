const roles = {
  calculateBillingAmount: [ 'ADMIN' ]
};

if (process.env.NODE_ENV === 'test') {
  roles.me = [ 'TEST' ];
}

module.exports = roles;
