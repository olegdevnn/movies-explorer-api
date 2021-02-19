const jwt = require('jsonwebtoken');

const { jwt: { secret } } = require('../config/auth');

const getJWTToken = (data, options = {}) => jwt.sign(
  data,
  secret,
  options,
);

module.exports = getJWTToken;
