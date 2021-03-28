const { UserExists } = require('../messages-err');
const UserExistsError = require('../user-exists-err');

describe('Тестируем ошибку, пользователь существует', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new UserExistsError().statusCode).toBe(409);
    expect(new UserExistsError().message).toBe(UserExists);
  });
});
