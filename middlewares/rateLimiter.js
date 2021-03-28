const rateLimit = require('express-rate-limit');

const rateLimiterSettings = require('../config/rateLimiter');
const TooManyRequestsError = require('../errors/too-many-requests-err');

const limitHandler = (req, res, next) => next(new TooManyRequestsError());

const addOptions = {
  // При первом достижения ограничения лимита
  onLimitReached: limitHandler,

  // После превышения максимального лимита
  handler: limitHandler,
};

const rateLimiter = rateLimit(Object.assign(rateLimiterSettings, addOptions));

module.exports = rateLimiter;
