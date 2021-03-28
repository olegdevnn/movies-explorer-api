const { MovieNotFound } = require('../messages-err');
const MovieNotFoundError = require('../movie-not-found-err');

describe('Тестируем ошибку 404 (фильм не найден)', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new MovieNotFoundError().statusCode).toBe(404);
    expect(new MovieNotFoundError().message).toBe(MovieNotFound);
  });
});
