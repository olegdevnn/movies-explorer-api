const { jwt: { expiresIn } } = require('../config/auth');
const UserExistsError = require('../errors/user-exists-err');
const NotFoundErrorUser = require('../errors/user-not-found-err');
const getJWTToken = require('../helpers/getJWTToken');
const hasUser = require('../helpers/hasUserExistsWithEmail');
const {
  authOk,
  logoutOk,
} = require('../messages/user');
const User = require('../models/user');
const { CREATED_SUCCESS } = require('../units/httpCodes');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { _id } = await User.findUserByCredentials({
      email,
      password,
    });

    const token = getJWTToken(
      { _id },
      { expiresIn },
    );

    return res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: expiresIn * 1000, // перевод в миллисекунды
        secure: process.env.NODE_ENV === 'production',
      })
      .send({ message: authOk });
  } catch (e) {
    return next(e);
  }
};

const logout = (req, res, next) => {
  try {
    return res
      .clearCookie('jwt')
      .send({ message: logoutOk });
  } catch (e) {
    return next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;

    if (await User.findOne({ email }).exec()) {
      return next(new UserExistsError());
    }

    const { _id } = await User.create({
      email,
      password,
      name,
    });
    const user = await User.findById(_id);

    return res.status(CREATED_SUCCESS).send(user);
  } catch (e) {
    return next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).exec();
    if (!user) {
      return next(new NotFoundErrorUser());
    }

    return res.send(user);
  } catch (e) {
    return next(e);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, name } = req.body;

    if (await hasUser({ email, _id })) {
      return next(new UserExistsError());
    }

    const user = await User.findByIdAndUpdate(_id, {
      email,
      name,
    }, {
      new: true,
      runValidators: true,
      omitUndefined: true,
    }).exec();
    if (!user) {
      return next(new NotFoundErrorUser());
    }

    return res.send(user);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  login, logout, createUser, getUser, editUser,
};
