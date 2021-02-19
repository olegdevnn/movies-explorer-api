const { UserNotFound } = require('./messages-err');
const NotFoundError = require('./not-found-err');

class UserNotFoundError extends NotFoundError {
  constructor(message = UserNotFound) {
    super(message);
  }
}

module.exports = UserNotFoundError;
