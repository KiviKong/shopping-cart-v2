const loginSchema = {
  required: true,
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8
    }
  }
};

module.exports = loginSchema;
