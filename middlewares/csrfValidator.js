const csurf = require('csurf');
const express = require('express');

const { NO_CONTENT } = require('../units/httpCodes');

const router = express.Router({ strict: true });

router.use(csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
  value: (req) => (req.cookies.csrfToken),
}));

router.get('/getToken', (req, res) => res
  .cookie('csrfToken', req.csrfToken ? req.csrfToken() : null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  }).status(NO_CONTENT).send());

module.exports = router;
