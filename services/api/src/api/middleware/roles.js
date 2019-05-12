const roles = {
  getUsers: [ 'ADMIN_US' ],
  createPack: [ 'ADMIN_US' ],
  getPack: [ 'ADMIN_US', 'ADMIN_MX' ],
  getPacks: [ 'ADMIN_US', 'ADMIN_MX', 'CLIENT' ],
  getReport: [ 'ADMIN_US', 'ADMIN_MX' ],
  updateStatus: [ 'ADMIN_US', 'ADMIN_MX' ],
  editUser: [ 'CLIENT' ]
};

if (process.env.NODE_ENV === 'test') {
  roles.me = [ 'TEST' ];
}

module.exports = roles;
