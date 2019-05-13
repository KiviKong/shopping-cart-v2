const getRaw = function(pieces = 0) {
  const response = {
    code: this.code,
    price: this.price,
    pieces: pieces,
    promotion: this.Promotion[0] ? this.Promotion[0].code : 'N/A'
  };

  return response;
};

module.exports = getRaw;

