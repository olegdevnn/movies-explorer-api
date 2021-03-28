require('../../tests/initDatabase').initDatabase();

const UserNotFoundError = require('../../errors/user-not-found-err');
const {
  userNot,
} = require('../../tests/fixtures/user');
const { createUserDb } = require('../../tests/initDatabase');
const verifyHasUser = require('../verifyHasUser');

describe('Тестируем проверку наличия пользователя', () => {
  it('Должен вернуться объект с данными, если пользователь существует', async () => {
    const { _id, email, name } = await createUserDb();

    await expect(verifyHasUser(_id)).resolves.toMatchObject({
      email,
      name,
    });
  });

  it('Должна вернуться ошибка, если пользователь не существует', async () => {
    await expect(verifyHasUser(userNot._id)).rejects.toThrow(
      new UserNotFoundError(),
    );
  });
});
