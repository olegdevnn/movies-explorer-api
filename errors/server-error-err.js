const { ServerError: ServerErrorMessage } = require('./messages-err');

class ServerError extends Error {
  constructor(message = ServerErrorMessage) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = ServerError;
