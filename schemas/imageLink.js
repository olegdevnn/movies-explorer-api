const Joi = require('joi');
const validator = require('validator');

const imageLink = require('../config/imageLink');
const joiMessages = require('../messages/joi');

const { minLength, maxLength } = imageLink;

const { isURL } = validator;

const imageLinkSchema = Joi.string()
  .min(minLength)
  .max(maxLength)
  .trim()
  .custom((value, helpers) => {
    if (!isURL(value)) {
      return helpers.error('url.invalid');
    }
    return value;
  })
  .messages(joiMessages);

module.exports = imageLinkSchema;
