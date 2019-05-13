const codes = {
  Server: {
    'Internal server error': 500,
    Unassigned: 501,
    InvalidRequest: 502,
    NotFound: 503,
    'Invalid format': 504
  },
  Session: {
    Unauthorized: 101,
    'email or password doesn\'t match': 102,
    'Unauthorized role': 103,
    'Not verified': 423
  }
};

module.exports = codes;
