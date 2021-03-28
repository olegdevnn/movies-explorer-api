const { celebrate, Segments } = require('celebrate');

const createMovieSchema = require('../../schemas/createMovie');

const createMovieValidator = celebrate({
  [Segments.BODY]: createMovieSchema,
});

module.exports = createMovieValidator;
