const movieMessages = require('../../messages/movie');
const {
  movieData, movieInvalid, imageLink,
} = require('../../tests/fixtures/movie');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const createMovieSchema = require('../createMovie');

describe('Тестируем схему проверки создания фильма', () => {
  it('Должны возвращаться входные данные, данные верны', async () => {
    const { value, error } = createMovieSchema.validate(movieData);

    expect(error).toBeUndefined();
    expect(value).toEqual(movieData);
    expect(createMovieSchema.describe().keys).toMatchObject({
      country: {
        flags: {
          label: movieMessages.country,
        },
      },
      description: {
        flags: {
          label: movieMessages.description,
        },
      },
      director: {
        flags: {
          label: movieMessages.director,
        },
      },
      duration: {
        flags: {
          label: movieMessages.duration,
        },
      },
      image: {
        flags: {
          label: movieMessages.image,
        },
      },
      movieId: {
        flags: {
          label: movieMessages.movieId,
        },
      },
      nameEN: {
        flags: {
          label: movieMessages.nameEN,
        },
      },
      nameRU: {
        flags: {
          label: movieMessages.nameRU,
        },
      },
      thumbnail: {
        flags: {
          label: movieMessages.thumbnail,
        },
      },
      trailer: {
        flags: {
          label: movieMessages.trailer,
        },
      },
      year: {
        flags: {
          label: movieMessages.year,
        },
      },
    });
  });

  describe('Должна быть ошибка на русском', () => {
    it('Не заполнено name', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(createMovieSchema, { ...movieData, nameRU: '' });
    });

    it('Не корректное movieId', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(createMovieSchema, {
        ...movieData,
        movieId: movieInvalid.movieIdInvalid,
      });
    });

    it('Не корректное duration', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(createMovieSchema, {
        ...movieData,
        duration: movieInvalid.durationInvalid,
      });
    });

    describe('Тестируем image', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          image: imageLink.imageShort,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          image: imageLink.imageLong,
        });
      });

      it('Не корректной формат изображений', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          image: imageLink.imageInvalid,
        });
      });
    });

    describe('Тестируем trailer', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          trailer: imageLink.imageShort,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          trailer: imageLink.imageLong,
        });
      });

      it('Не корректной формат', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          trailer: imageLink.imageInvalid,
        });
      });
    });

    describe('Тестируем thumbnail', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          thumbnail: imageLink.imageShort,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          thumbnail: imageLink.imageLong,
        });
      });

      it('Не корректной формат', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createMovieSchema, {
          ...movieData,
          thumbnail: imageLink.imageInvalid,
        });
      });
    });
  });
});
