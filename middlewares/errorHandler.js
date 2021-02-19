const { isCelebrateError } = require('celebrate');

const { ServerError } = require('../errors/messages-err');
const { badJson, invalidData } = require('../messages/errors');
const { ERROR_SERVER_ERROR } = require('../units/httpCodes');
const { ERROR_BAD_REQUEST } = require('../units/httpCodes');

const errorHandler = (err, req, res, next) => {
  let {
    statusCode = ERROR_SERVER_ERROR,
    message = '',
  } = err;

  try {
    if (isCelebrateError(err)) {
      try {
        const [, joiError] = err.details.entries().next().value;
        message = joiError.message;
      } catch (e) {
        //
      } finally {
        statusCode = ERROR_BAD_REQUEST;
      }
    } else if (err.name === 'CastError') {
      try {
        message = `${invalidData} '${err.path}'`;
      } catch (e) {
        //
      } finally {
        statusCode = ERROR_BAD_REQUEST;
      }
    } else if (err.name === 'ValidationError') {
      try {
        const errors = Object.values(err.errors).map((el) => el.message);
        message = errors.join(', ');
      } catch (e) {
        //
      } finally {
        statusCode = ERROR_BAD_REQUEST;
      }
    } else if (err.type === 'entity.parse.failed') {
      message = badJson;
      statusCode = ERROR_BAD_REQUEST;
    }
  } catch (e) {
    console.log(e);
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_SERVER_ERROR || !message
        ? ServerError
        : message,
    });

  next();
};

module.exports = errorHandler;
