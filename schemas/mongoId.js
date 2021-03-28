const Joi = require('joi');
const mongoose = require('mongoose');

const joiMessages = require('../messages/joi');

const mongoIdSchema = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('string.invalid');
    }

    return value;
  })
  .messages(joiMessages);

module.exports = mongoIdSchema;
