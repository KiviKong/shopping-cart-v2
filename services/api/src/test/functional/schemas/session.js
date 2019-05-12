const loginSchema = {
  required: true,
  type: 'object',
  properties: {
    token: {
      type: 'string',
      required: true
    },
    expirationDate: {
      type: 'string',
      required: true
    },
    user: {
      type: 'object',
      required: true,
      properties: {
        id: {
          type: 'integer',
          requried: true
        },
        email: {
          type: 'string',
          required: true
        },
        role: {
          type: 'string',
          required: true
        }
      }
    }

  },
  additionalProperties: false
};

module.exports = loginSchema;
