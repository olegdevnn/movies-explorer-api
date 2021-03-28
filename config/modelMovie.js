const imageLink = require('./imageLink');

const { minLength, maxLength } = imageLink;

// Параметры для модели карточек
const modelMovie = {
  image: {
    minLength,
    maxLength,
  },
};

module.exports = modelMovie;
