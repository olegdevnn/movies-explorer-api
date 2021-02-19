const express = require('express');

const auth = require('../middlewares/auth');
const notFoundErrorHandler = require('../middlewares/notFoundError');
const authRouter = require('./auth');
const crashTestRouter = require('./crashTest');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

const router = express.Router({ strict: true });

router.use(authRouter);

router.use(auth);
router.use(crashTestRouter); // TODO отключить после запуска проекта
router.use('/movies', moviesRouter);
router.use('/users', usersRouter);
router.use(notFoundErrorHandler);

module.exports = router;
