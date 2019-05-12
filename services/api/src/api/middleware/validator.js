const validator = require('is-my-json-valid');
const errorHelper = require('../helpers/error');

require('chai').should();

class Validator {
  validate(schema, context) {
    return (value) => {
      const validation = validator(schema);

      validation(value);

      if (validation.errors) {
        let field = validation.errors[0].field;

        field = field.replace('data.', '');

        const error = {
          path: field,
          message: 'InvalidRequest'
        };

        return errorHelper.handleResponse('Server', error, context.guid);
      }

      return Promise.resolve();
    };
  }
}

module.exports = new Validator();
