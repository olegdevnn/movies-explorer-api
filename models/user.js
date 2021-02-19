const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const { saltRounds } = require('../config/app');
const modelUserConfig = require('../config/modelUser');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  authInvalidData,
} = require('../messages/user');

const { isEmail } = validator;

const {
  email,
  name,
} = modelUserConfig;

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: email.minLength,
    maxLength: email.maxLength,
    validate: isEmail,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minLength: name.minLength,
    maxLength: name.maxLength,
    trim: true,
  },
}, {
  timestamps: true,
});

userSchema.statics.config = modelUserConfig;

userSchema.statics.findUserByCredentials = function findUserByCredentials({
  email: userEmail,
  password: userPassword,
}) {
  return this.findOne({ email: userEmail })
    .select('+password')
    .orFail(() => new UnauthorizedError(authInvalidData))
    .then((user) => bcrypt
      .compare(userPassword, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise
            .reject(new UnauthorizedError(authInvalidData));
        }

        return user;
      }));
};

userSchema.pre(['save', 'updateOne'], async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
  } catch (e) {
    next(e);
  }

  return next();
});

module.exports = mongoose.model('user', userSchema);
