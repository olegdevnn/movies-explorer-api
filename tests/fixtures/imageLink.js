const getStringArbitrary = require('../../units/getStringArbitrary');

module.exports = {
  imageValid: 'http://www.ru/image.png',
  imageInvalid: 'http-www.ru/image.png',
  imageShort: 'http://www.ru/i.png',
  imageLong: `http://www.ru/${getStringArbitrary(300)}.png`,
};
