const { MethodNotAllowed } = require('../messages-err');
const MethodNotAllowedError = require('../method-not-allowed-err');

describe('Тестируем ошибку 405', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new MethodNotAllowedError().statusCode).toBe(405);
    expect(new MethodNotAllowedError().message).toBe(MethodNotAllowed);
  });
});
