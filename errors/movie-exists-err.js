const ConflictError = require('./conflict-err');
const { MovieExists } = require('./messages-err');

class MovieExistsError extends ConflictError {
  constructor(message = MovieExists) {
    super(message);
  }
}

module.exports = MovieExistsError;
