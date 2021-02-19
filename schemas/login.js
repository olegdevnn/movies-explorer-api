const Joi = require('joi');

const { passwordSchema, emailSchema } = require('./user');

const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
}).with('email', 'password');

module.exports = loginSchema;
