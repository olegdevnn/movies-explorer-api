const { ServerError: ServerErrorMessage } = require('../messages-err');
const ServerError = require('../server-error-err');

describe('Тестируем ошибку 500', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new ServerError().statusCode).toBe(500);
    expect(new ServerError().message).toBe(ServerErrorMessage);
  });
});
