const ForbiddenError = require('../errors/forbidden-err');
const MovieExistsError = require('../errors/movie-exists-err');
const NotFoundErrorMovie = require('../errors/movie-not-found-err');
const Movie = require('../models/movie');
const { CREATED_SUCCESS } = require('../units/httpCodes');

const getMovies = async (req, res, next) => {
  try {
    const { user } = req;

    const movies = await Movie.find({ owner: user._id });

    return res.send(movies);
  } catch (e) {
    return next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;

    const { user } = req;

    if (await Movie.findOne({ movieId, owner: user._id }).exec()) {
      return next(new MovieExistsError());
    }

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: user._id,
    });

    return res.status(CREATED_SUCCESS).send(movie);
  } catch (e) {
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { user } = req;

    const movie = await Movie.findById(movieId).exec();
    if (!movie) {
      return next(new NotFoundErrorMovie());
    }

    if (!movie.owner.equals(user._id)) {
      return next(new ForbiddenError());
    }

    const deletedMovie = await Movie.findByIdAndRemove(movie._id).exec();

    return res.send(deletedMovie);
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
