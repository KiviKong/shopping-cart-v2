const roles = require('./roles');
const errorHelper = require('../helpers/error');

class Authorization {
  validate(method, context) {
    if (roles[method].indexOf(context.session.user.role) === -1) {
      const error = {
        path: 'user',
        message: 'Unauthorized role'
      };

      return errorHelper.handleResponse('Session', error, context.guid);
    } else if (!context.session.user.verified) {
      const error = {
        path: 'user',
        message: 'Not verified'
      };

      return errorHelper.handleResponse('Session', error, context.guid);
    }

    return Promise.resolve();
  }
}

module.exports = new Authorization();
