const Joi = require('joi');
const validator = require('validator');

const verifyPassword = require('../helpers/verifyStrongPassword');
const {
  passwordSchema,
  emailSchema,
  nameSchema,
} = require('./user');

const { isEmail } = validator;

const createUserSchema = Joi.object({
  email: emailSchema
    .required()
    .custom((value, helpers) => {
      if (!isEmail(value)) {
        return helpers.error('string.email');
      }
      return value;
    }),
  password: passwordSchema
    .required()
    .custom(verifyPassword),
  name: nameSchema,
})
  .with('email', 'password')
  .with('email', 'name');

module.exports = createUserSchema;
