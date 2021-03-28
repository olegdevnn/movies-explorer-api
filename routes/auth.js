const express = require('express');

const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const methodNotAllowed = require('../middlewares/methodMotAllowed');
const sendHttpOptions = require('../middlewares/sendHttpOptions');
const createUserValidator = require('../middlewares/validators/createUser');
const loginValidator = require('../middlewares/validators/login');

const router = express.Router({ strict: true });

router.route('/signin')
  .post(loginValidator, login)
  .options((req, res) => {
    req.allowMethods = 'POST,OPTIONS';
    sendHttpOptions(req, res);
  })
  .all(methodNotAllowed);

router.route('/signup')
  .post(createUserValidator, createUser)
  .options((req, res) => {
    req.allowMethods = 'POST,OPTIONS';
    sendHttpOptions(req, res);
  })
  .all(methodNotAllowed);

router.route('/logout')
  .post(auth, logout)
  .options((req, res) => {
    req.allowMethods = 'POST,OPTIONS';
    sendHttpOptions(req, res);
  })
  .all(methodNotAllowed);

module.exports = router;
