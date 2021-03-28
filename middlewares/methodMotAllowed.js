const MethodNotAllowedError = require('../errors/method-not-allowed-err');

const methodNotAllowed = (req, res, next) => {
  next(new MethodNotAllowedError());
};

module.exports = methodNotAllowed;
