const {
  DB_HOST = 'mongodb://localhost:27017',
  DB_NAME = 'bitFilmsDb',
  DB_USER = '',
  DB_PASS = '',
  NODE_ENV,
} = process.env;

const databaseSettings = {
  server: {
    DB_HOST,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: NODE_ENV === 'development',
      dbName: DB_NAME,
      user: DB_USER,
      pass: DB_PASS,
      authSource: (DB_USER),
    },
  },
  test: {
    DB_HOST: 'mongodb://localhost:27017',
    DB_NAME: 'bitFilmsDbTest',
    DB_USER: '',
    DB_PASS: '',
  },
};

module.exports = databaseSettings;
