const ForbiddenError = require('../forbidden-err');
const { Forbidden } = require('../messages-err');

describe('Тестируем ошибку 403', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new ForbiddenError().statusCode).toBe(403);
    expect(new ForbiddenError().message).toBe(Forbidden);
  });
});
