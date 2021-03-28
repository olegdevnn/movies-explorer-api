const getRandomArbitrary = require('../../units/getRandomArbitrary');
const imageLink = require('./imageLink');

module.exports = {
  movieData: {
    country: 'country',
    director: 'director',
    duration: 100,
    year: 'year',
    description: 'description',
    image: imageLink.imageValid,
    trailer: imageLink.imageValid,
    nameRU: 'jestRU',
    nameEN: 'jestEN',
    thumbnail: imageLink.imageValid,
    movieId: 1,
  },
  movieInvalid: {
    durationInvalid: 'hundred',
    movieIdInvalid: 'one',
  },
  movieOther: {
    _id: '6026be285f1b3764a8503111',
    movieIdRand() { return getRandomArbitrary(100000, 900000); },
    nameRand() { return `jestName${getRandomArbitrary(100000, 900000)}`; },
  },
  movieNot: {
    _id: '6026be285f1b3764a8503016',
  },
  imageLink,
};
