const Joi = require('joi');

const authMessages = require('../messages/auth');
const joiMessages = require('../messages/joi');

const authTokenSchema = Joi.string()
  .min(20)
  .max(500)
  .label(authMessages.token)
  .messages(joiMessages);

module.exports = authTokenSchema;
