const getRaw = function() {
  const response = {
    id: this.id,
    name: this.name,
    email: this.email,
    role: this.role || '',
    verified: this.verified
  };

  return response;
};

module.exports = getRaw;
