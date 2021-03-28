const { celebrate, Segments } = require('celebrate');

const movieIdSchema = require('../../schemas/movieId');

const deleteMovieValidator = celebrate({
  [Segments.PARAMS]: movieIdSchema,
});

module.exports = deleteMovieValidator;
