const { errors } = require(process.env.COMMON_FIXTURES_PATH);
const sendError = errors.customError('Session');

const args = {
  input: {
    items: [
      {
        code: 'PANTS',
        pieces: 2
      }
    ]
  }
};
const itemFormated = {
  promotion: '2-for-1',
  code: 'PANTS'
};
const itemsInstance = [ {
  code: 'PANTS',
  price: 1,
  getRaw: () => {
    return;
  }
} ];
const getItemsParams = [ [ 'PANTS' ] ];
const response = {
  items: [ itemFormated ],
  total: 2,
  discount: 1,
  totalAfterDiscount: 1
};
const getRawParams = [ 2 ];

module.exports = {
  error: sendError,
  args,
  itemsInstance,
  itemFormated,
  getItemsParams,
  response,
  getRawParams
};
