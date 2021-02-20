/*
  Буду рад любым предложениям по улучшению кода и структуре.
  Для удобства, созданы тесты.
  Спасибо.
 */

require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const { server } = require('./config/db');
const clientErrorHandler = require('./middlewares/clientErrorHandler');
const corsValidator = require('./middlewares/corsValidator');
const csrf = require('./middlewares/csrfValidator');
const errorHandler = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const rateLimit = require('./middlewares/rateLimiter');
const cookiesHandler = require('./middlewares/validators/cookiesHandler');
const routes = require('./routes/index');

const app = express();

const { NODE_ENV = 'production' } = process.env;
const {
  DB_HOST, options,
} = server;

app.use(requestLogger);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use(cookiesHandler);

// TODO cors блокирует PostMan (отключить на сервере когда будет фронтенд)
if (NODE_ENV === 'productionFrontend') {
  app.use(corsValidator);
}
app.use(csrf);
app.use(rateLimit);
app.use(helmet());

mongoose.connect(DB_HOST, options, (err) => {
  if (err) console.log(err);
});
mongoose.set('debug', { shell: NODE_ENV === 'development' });

app.use(routes);
app.use(clientErrorHandler);
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
