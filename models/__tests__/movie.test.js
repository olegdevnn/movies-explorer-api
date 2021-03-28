require('../../tests/initDatabase').initDatabase();
const mongoose = require('mongoose');

const {
  movieData,
  movieInvalid,
  movieOther,
  imageLink,
} = require('../../tests/fixtures/movie');
const { createUserDb } = require('../../tests/initDatabase');
const Movie = require('../movie');

const {
  movieIdRand,
  nameRand,
} = movieOther;

describe('Тестируем модель фильма на добавление', () => {
  it('Должен быть добавлен фильм', async () => {
    const user = await createUserDb();
    const movie = await Movie.create({
      ...movieData,
      movieId: movieIdRand(),
      owner: user._id,
    });
    const { any } = expect;

    expect(movie).toBeDefined();
    expect(movie).toMatchObject(movie);
    expect(movie).toMatchObject({
      country: any(String),
      director: any(String),
      duration: any(Number),
      year: any(String),
      description: any(String),
      image: any(String),
      trailer: any(String),
      nameRU: any(String),
      nameEN: any(String),
      thumbnail: any(String),
      owner: any(mongoose.Types.ObjectId),
      movieId: any(Number),
    });
  });

  it('movieId имеет неверный формат', async () => {
    await expect(Movie.create({
      ...movieData,
      movieId: movieInvalid.movieIdInvalid,
    })).rejects.toThrow();
  });

  it('Длительность имеет неверный формат', async () => {
    await expect(Movie.create({
      ...movieData,
      movieId: movieIdRand(),
      duration: movieInvalid.durationInvalid,
    })).rejects.toThrow();
  });

  it('Изображение имеет неверный формат', async () => {
    await expect(Movie.create({
      ...movieData,
      movieId: movieIdRand(),
      image: movieInvalid.imageInvalid,
      trailer: movieInvalid.imageInvalid,
      thumbnail: movieInvalid.imageInvalid,
    })).rejects.toThrow();
  });

  it('Слишком короткая длина изображений', async () => {
    await expect(Movie.create({
      ...movieData,
      movieId: movieIdRand(),
      image: imageLink.imageLong,
      trailer: imageLink.imageLong,
      thumbnail: imageLink.imageLong,
    })).rejects.toThrow();
  });

  it('Слишком длинная длина изображений', async () => {
    await expect(Movie.create({
      ...movieData,
      movieId: movieIdRand(),
      image: imageLink.imageLong,
      trailer: imageLink.imageLong,
      thumbnail: imageLink.imageLong,
    })).rejects.toThrow();
  });
});

describe('Тестируем получение данных фильма', () => {
  it('Должны быть получены данные',
    async () => {
      const user = await createUserDb();
      const movie = await Movie.create({
        ...movieData,
        movieId: movieIdRand(),
        owner: user._id,
      });

      return Movie.findById(movie._id)
        .then((doc) => {
          expect(doc).toBeDefined();
          expect(doc).toMatchObject(movie.toJSON());
        });
    });
});

describe('Тестируем модель фильма обновление данные', () => {
  it('Должны обновиться данные', async () => {
    const user = await createUserDb();

    const newMovieId = movieIdRand();
    const movie = await Movie.create({
      ...movieData,
      movieId: newMovieId,
      owner: user._id,
    });

    const newData = {
      ...movieData,
      movieId: newMovieId,
      nameRU: nameRand(),
    };

    const getMovie = await Movie.findById(movie._id).exec();
    Object.assign(getMovie, newData);
    await getMovie.save();

    expect(await Movie.findById(movie._id)).toMatchObject(newData);
  });
});
