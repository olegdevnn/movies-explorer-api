const NotFoundError = require('../errors/not-found-err');

const notFoundError = (req, res, next) => {
  next(new NotFoundError());
};

module.exports = notFoundError;
