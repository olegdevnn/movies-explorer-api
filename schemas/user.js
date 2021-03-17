const Joi = require('joi');

const joiMessages = require('../messages/joi');
const userMessages = require('../messages/user');
const User = require('../models/user');

const { string } = Joi.types();

const {
  email, password, name,
} = User.config;

const emailSchema = string
  .label(userMessages.email)
  .email({ minDomainSegments: 2 })
  .min(email.minLength)
  .max(email.maxLength)
  .trim()
  .messages(joiMessages);

const passwordSchema = string
  .label(userMessages.password)
  .min(password.minLength)
  .max(password.maxLength)
  .trim()
  .messages(joiMessages);

const nameSchema = string
  .label(userMessages.name)
  .min(name.minLength)
  .max(name.maxLength)
  .regex(RegExp(/^[a-z- ]+$/i))
  .trim()
  .messages(joiMessages);

module.exports = {
  emailSchema,
  passwordSchema,
  nameSchema,
};
