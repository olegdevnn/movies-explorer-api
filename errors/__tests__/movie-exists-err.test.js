const { MovieExists } = require('../messages-err');
const MovieExistsError = require('../movie-exists-err');

describe('Тестируем ошибку, фильм существует', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new MovieExistsError().statusCode).toBe(409);
    expect(new MovieExistsError().message).toBe(MovieExists);
  });
});
