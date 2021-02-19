const mongoose = require('mongoose');
const validator = require('validator');

const modelMovieConfig = require('../config/modelMovie');

const { isURL } = validator;

const { Schema } = mongoose;
const { Types } = Schema;
const { ObjectId } = Types;

const { image } = modelMovieConfig;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    minLength: image.minLength,
    maxLength: image.maxLength,
    validate: isURL,
    trim: true,
  },
  trailer: {
    type: String,
    required: true,
    minLength: image.minLength,
    maxLength: image.maxLength,
    validate: isURL,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    minLength: image.minLength,
    maxLength: image.maxLength,
    validate: isURL,
    trim: true,
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
},
{
  timestamps: true,
});

movieSchema.statics.config = modelMovieConfig;

module.exports = mongoose.model('movie', movieSchema);
