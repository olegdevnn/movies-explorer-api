const User = require('../models/user');

const hasUserExistsWithEmail = async ({ email, _id }) => {
  try {
    const user = await User.findOne({ email }).exec();
    return user && !user._id.equals(_id);
  } catch (e) {
    return false;
  }
};

module.exports = hasUserExistsWithEmail;
