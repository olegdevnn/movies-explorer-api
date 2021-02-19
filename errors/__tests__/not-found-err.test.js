const { NotFound } = require('../messages-err');
const NotFoundError = require('../not-found-err');

describe('Тестируем ошибку 404', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new NotFoundError().statusCode).toBe(404);
    expect(new NotFoundError().message).toBe(NotFound);
  });
});
