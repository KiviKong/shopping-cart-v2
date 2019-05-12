const _ = require('lodash');

const user = {
  id: 1,
  name: 'A first name with a las name',
  email: 'some@email.com',
  role: 'ADMIN_US',
  verified: true
};
const response = {
  id: 1,
  name: 'A first name with a las name',
  email: 'some@email.com',
  role: 'ADMIN_US',
  verified: true
};

const userWithoutRole = _.cloneDeep(user);
const responseWithoutRole = _.cloneDeep(response);

delete userWithoutRole.role;
responseWithoutRole.role = '';

module.exports = {
  user,
  userWithoutRole,
  response,
  responseWithoutRole
};
