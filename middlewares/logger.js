const expressWinston = require('express-winston');
const winston = require('winston');

const { requestFile, errorFile } = require('../config/logger');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: requestFile }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: errorFile }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
