const { MethodNotAllowed } = require('./messages-err');

class MethodNotAllowedError extends Error {
  constructor(message = MethodNotAllowed) {
    super(message);
    this.statusCode = 405;
  }
}

module.exports = MethodNotAllowedError;
