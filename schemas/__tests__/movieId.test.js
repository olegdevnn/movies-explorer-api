const {
  movieOther, movieInvalid,
} = require('../../tests/fixtures/movie');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const movieIdSchema = require('../movieId');

const { _id } = movieOther;
const { movieIdInvalid } = movieInvalid;

describe('Тестирование схемы проверки id фильма', () => {
  it('Должны возвращаться входные данные, данные верны', async () => {
    expect.assertions(2);
    const newData = {
      movieId: _id,
    };
    const { value, error } = movieIdSchema.validate(newData);

    expect(error).toBeUndefined();
    expect(value).toEqual(newData);
  });

  it('Должна быть ошибка на русском, не валидный id', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(movieIdSchema, {
      movieId: movieIdInvalid,
    });
  });
});
