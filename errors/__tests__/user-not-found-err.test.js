const { UserNotFound } = require('../messages-err');
const NotFoundUserError = require('../user-not-found-err');

describe('Тестируем ошибку 404 (пользователь не найден)', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new NotFoundUserError().statusCode).toBe(404);
    expect(new NotFoundUserError().message).toBe(UserNotFound);
  });
});
