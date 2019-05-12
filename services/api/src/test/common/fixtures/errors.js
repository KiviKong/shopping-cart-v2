module.exports = {
  commonError: {
    error: {
      path: 'Something',
      message: 'Not found',
      code: 503
    }
  },
  customError: (path) => {
    return {
      path,
      message: 'send error'
    };
  }
};
