const Joi = require('joi');

const mongoIDSchema = require('./mongoId');

const movieIdSchema = Joi.object({
  movieId: mongoIDSchema,
});

module.exports = movieIdSchema;
