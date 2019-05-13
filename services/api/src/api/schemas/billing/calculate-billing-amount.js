const billingAmountSchema = {
  required: true,
  type: 'object',
  properties: {
    items: {
      type: 'array',
      required: true,
      minItems: 1,
      items: {
        required: true,
        type: 'object',
        properties: {
          code: {
            type: 'string',
            required: true,
            pattern: /^[A-Z]*$/
          },
          pieces: {
            type: 'integer',
            required: true,
            minimum: 1
          }
        }
      }
    }
  }
};

module.exports = billingAmountSchema;

