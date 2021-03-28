const { BadRequest } = require('./messages-err');

class BadRequestError extends Error {
  constructor(message = BadRequest) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
