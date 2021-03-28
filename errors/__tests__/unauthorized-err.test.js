const { Unauthorized } = require('../messages-err');
const UnauthorizedError = require('../unauthorized-err');

describe('Тестируем ошибку 401', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new UnauthorizedError().statusCode).toBe(401);
    expect(new UnauthorizedError().message).toBe(Unauthorized);
  });
});
