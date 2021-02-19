const cors = require('cors');

const { whiteList } = require('../config/cors');
const MethodNotAllowedError = require('../errors/method-not-allowed-err');

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new MethodNotAllowedError());
    }
  },
};

const corsValidator = cors(corsOptions);

module.exports = corsValidator;
