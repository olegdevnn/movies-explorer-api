const { MovieNotFound } = require('./messages-err');
const NotFoundError = require('./not-found-err');

class MovieNotFoundError extends NotFoundError {
  constructor(message = MovieNotFound) {
    super(message);
  }
}

module.exports = MovieNotFoundError;
