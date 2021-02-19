const NotFoundUserError = require('../errors/user-not-found-err');
const User = require('../models/user');

const verifyHasUser = (userId) => User.findById(userId)
  .orFail(() => new NotFoundUserError());

module.exports = verifyHasUser;
