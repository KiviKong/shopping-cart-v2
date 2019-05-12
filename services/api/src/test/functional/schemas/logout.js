const logoutSchema = {
  required: true,
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      requried: true
    }
  },
  additionalProperties: false
};

module.exports = logoutSchema;
