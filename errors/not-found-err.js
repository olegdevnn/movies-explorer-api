const { NotFound } = require('./messages-err');

class NotFoundError extends Error {
  constructor(message = NotFound) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
