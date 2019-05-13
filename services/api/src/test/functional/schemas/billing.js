const billingSchema = {
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
          },
          price: {
            type: 'number',
            required: true
          },
          promotion: {
            type: 'string',
            required: true
          }
        }
      }
    },
    total: {
      type: 'number',
      required: true
    },
    discount: {
      type: 'number',
      required: true
    },
    totalAfterDiscount: {
      type: 'number',
      required: true
    }
  }
};

module.exports = billingSchema;
