const ServerError = require('../errors/server-error-err');

const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    return next(new ServerError());
  }

  return next(err);
};

module.exports = clientErrorHandler;
