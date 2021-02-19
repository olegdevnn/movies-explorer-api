const { TooManyRequest } = require('./messages-err');

class TooManyRequestsError extends Error {
  constructor(message = TooManyRequest) {
    super(message);
    this.statusCode = 429;
  }
}

module.exports = TooManyRequestsError;
