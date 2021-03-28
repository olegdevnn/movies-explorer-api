const jwt = require('jsonwebtoken');

const { jwt: { secret } } = require('../config/auth');

const verifyJWTToken = (token) => jwt.verify(token, secret);

module.exports = verifyJWTToken;
