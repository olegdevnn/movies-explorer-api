const getRandomArbitrary = require('../../units/getRandomArbitrary');
const getStringArbitrary = require('../../units/getStringArbitrary');

module.exports = {
  userData: {
    name: 'Name',
    email: 'jest@email.com',
    password: '1234QWer$',
  },
  userEditData: {
    email: 'jest@email.com',
    name: 'Name',
  },
  userLoginData: {
    email: 'jest@email.com',
    password: '1234QWer$',
  },
  userInvalid: {
    emailInvalid: 'jest-email.com',
    emailShort: 'e@e.com',
    emailLong: `email${getStringArbitrary(50)}@email.com`,
    nameLong: `Name${getStringArbitrary(50)}`,
    nameShort: 'N',
    passwordNotStrongOne: 'aa',
    passwordNotStrongTwo: 'aaAA',
    passwordNotStrongThree: 'aaAA11',
    passwordShort: 'aA1!',
    passwordLong: getStringArbitrary(50),
  },
  userOther: {
    _id: '6026be285f1b3764a8503016',
    emailTwo: 'jestTwo@email.com',
    passwordTwo: '1234QWer$-2',
    nameTwo: 'jestNameTwo',
    emailRand() { return `email${getRandomArbitrary(1000000, 9000000)}@email.com`; },
    passwordRand() { return `aA!${getRandomArbitrary(1000000, 9000000)}`; },
    nameRand() { return `name${getRandomArbitrary(1000000, 9000000)}`; },
  },
  userNot: {
    _id: '6026be285f1b3764a8503016',
  },
};
