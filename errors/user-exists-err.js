const ConflictError = require('./conflict-err');
const { UserExists } = require('./messages-err');

class UserExistsError extends ConflictError {
  constructor(message = UserExists) {
    super(message);
  }
}

module.exports = UserExistsError;
