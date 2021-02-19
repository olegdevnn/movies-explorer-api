const express = require('express');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const methodNotAllowed = require('../middlewares/methodMotAllowed');
const sendHttpOptions = require('../middlewares/sendHttpOptions');
const createMovieValidator = require('../middlewares/validators/createMovie');
const deleteMovieValidator = require('../middlewares/validators/deleteMovie');

const router = express.Router({ strict: true });

router.route('/')
  .get(getMovies)
  .post(createMovieValidator, createMovie)
  .options((req, res) => {
    req.allowMethods = 'GET,POST,OPTIONS';
    sendHttpOptions(req, res);
  })
  .all(methodNotAllowed);

router.route('/:movieId')
  .delete(deleteMovieValidator, deleteMovie)
  .options((req, res) => {
    req.allowMethods = 'DELETE,OPTIONS';
    sendHttpOptions(req, res);
  })
  .all(methodNotAllowed);

module.exports = router;
