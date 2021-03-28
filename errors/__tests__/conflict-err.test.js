const ConflictError = require('../conflict-err');

describe('Тестируем ошибку 409', () => {
  it('Должен возвращать корректный статус об ошибке', () => {
    expect.hasAssertions();
    expect(new ConflictError().statusCode).toBe(409);
  });
});
