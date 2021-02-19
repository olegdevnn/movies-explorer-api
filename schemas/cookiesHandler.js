const Joi = require('joi');

const joiMessages = require('../messages/joi');
const authToken = require('./authToken');

const cookiesHandlerSchema = Joi.object().keys({
  jwt: authToken,
  csrfToken: authToken,
  _csrf: authToken, // по умолчанию csurf
})
  .options({ allowUnknown: true })
  .messages(joiMessages);

module.exports = cookiesHandlerSchema;
