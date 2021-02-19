const getStringArbitrary = require('../../units/getStringArbitrary');

module.exports = {
  tokenInvalid: getStringArbitrary(30),
  tokenShort: getStringArbitrary(10),
  tokenLong: getStringArbitrary(1000),
};
