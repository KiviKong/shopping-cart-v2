const log = new (require('/var/lib/core/js/log'))(module);
const errorCodes = require('../../config/error-codes');

class ErrorHelper {
  format(type, error, isRequestValidationError) {
    const errorsMap = errorCodes[type];
    const formatted = {
      path: error.path,
      message: error.message
    };

    if (isRequestValidationError) {
      formatted.code = errorCodes.Server.InvalidRequest;
    } else if (error.message === 'Not found') {
      formatted.code = errorCodes.Server.NotFound;
    } else if (!errorsMap || !errorsMap[error.message]) {
      formatted.code = errorCodes.Server.Unassigned;
    } else {
      formatted.code = errorsMap[error.message];
    }

    return formatted;
  }

  handleResponse(type, error, guid, res) {
    return Promise.resolve()
      .then(() => {
        const response = this.format(type, error);

        log.error(error, guid, response);

        if (res) {
          const err = {
            error: response
          };

          return res.send(err);
        }

        return Promise.reject(response);
      });
  }
}

module.exports = new ErrorHelper();
