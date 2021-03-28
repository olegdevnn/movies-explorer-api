const UnauthorizedError = require('../errors/unauthorized-err');
const verifyHasUser = require('../helpers/verifyHasUser');
const verifyJWTToken = require('../helpers/verifyJWTToken');

module.exports = async (req, res, next) => {
  const { jwt } = req.cookies;

  const errorMessage = () => new UnauthorizedError();

  if (!jwt) {
    return next(errorMessage());
  }

  let payload;

  try {
    payload = verifyJWTToken(jwt);
  } catch (err) {
    return next(errorMessage());
  }

  try {
    await verifyHasUser(payload._id);
  } catch (err) {
    return next(errorMessage());
  }

  req.user = payload;

  return next();
};
