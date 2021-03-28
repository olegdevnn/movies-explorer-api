const Joi = require('joi');

const joiMessages = require('../messages/joi');
const {
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
} = require('../messages/movie');
const imageLinkSchema = require('./imageLink');

const { object, string, number } = Joi.types();

const createMovieSchema = object.keys({
  country: string.label(country),
  director: string.label(director),
  duration: number.label(duration),
  year: string.label(year),
  description: string.label(description),
  image: imageLinkSchema.label(image),
  trailer: imageLinkSchema.label(trailer),
  thumbnail: imageLinkSchema.label(thumbnail),
  movieId: number.label(movieId),
  nameRU: string.label(nameRU),
  nameEN: string.label(nameEN),
})
  .options({ presence: 'required' })
  .messages(joiMessages);

module.exports = createMovieSchema;
