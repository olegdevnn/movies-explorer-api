const mongoose = require('mongoose');

const { test } = require('../config/db');
const Movie = require('../models/movie');
const User = require('../models/user');
const { userOther } = require('./fixtures/user');

const {
  emailRand,
  passwordRand,
  nameRand,
} = userOther;

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = test;

const initDatabase = () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: true,
      dbName: DB_NAME,
      user: DB_USER,
      pass: DB_PASS,
    });
    mongoose.set('debug', true);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
};

const createUserDb = async () => {
  const password = passwordRand();
  const user = await User.create({
    email: emailRand(),
    password,
    name: nameRand(),
  });

  user.password = password;

  return user;
};

const createMovieDb = async (data) => Movie.create(data);

module.exports = {
  initDatabase,
  createUserDb,
  createMovieDb,
};
