const user = {
  required: true,
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      requried: true
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    role: {
      type: 'string',
      required: true
    },
    verified: {
      type: 'boolean',
      required: true
    }
  },
  additionalProperties: false
};

module.exports = user;
