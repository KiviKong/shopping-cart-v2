const errorSchema = {
  required: true,
  type: 'object',
  properties: {
    path: {
      type: 'string',
      requried: true
    },
    message: {
      type: 'string',
      required: true
    },
    code: {
      type: 'integer'
    }
  },
  additionalProperties: false
};

module.exports = errorSchema;
