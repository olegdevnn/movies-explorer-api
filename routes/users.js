const express = require('express');

const { editUser, getUser } = require('../controllers/users');
const methodNotAllowed = require('../middlewares/methodMotAllowed');
const sendHttpOptions = require('../middlewares/sendHttpOptions');
const editUserValidator = require('../middlewares/validators/editUser');

const router = express.Router({ strict: true });

router.route('/me')
  .get(getUser)
  .patch(editUserValidator, editUser)
  .options((req, res) => {
    req.allowMethods = 'GET,PATCH,OPTIONS';
    sendHttpOptions(req, res);
  })
  .all(methodNotAllowed);

module.exports = router;
