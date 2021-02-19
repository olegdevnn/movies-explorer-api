const Joi = require('joi');

const joiMessages = require('../messages/joi');
const {
  emailSchema,
  nameSchema,
} = require('./user');

const editUserSchema = Joi.object().keys({
  email: emailSchema,
  name: nameSchema,
})
  .or('email', 'name')
  .messages(joiMessages);

module.exports = editUserSchema;
