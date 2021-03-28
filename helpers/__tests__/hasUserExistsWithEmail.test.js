require('../../tests/initDatabase').initDatabase();

const {
  userOther,
  userNot,
} = require('../../tests/fixtures/user');
const { createUserDb } = require('../../tests/initDatabase');
const hasUserExistsWithEmail = require('../hasUserExistsWithEmail');

describe('Тестируем функцию проверки свободного email', () => {
  it('Должен вернуться true, если такой email с _id уже есть', async () => {
    expect.hasAssertions();

    const { email, _id } = await createUserDb();

    await expect(hasUserExistsWithEmail({
      email,
      _id,
    }))
      .resolves
      .toBeFalsy();
  });

  it('Должен вернуться false, если email не найден', async () => {
    expect.hasAssertions();

    const { _id } = await createUserDb();

    await expect(hasUserExistsWithEmail({
      email: userOther.emailTwo,
      _id,
    }))
      .resolves
      .toBeFalsy();
  });

  it('Должен вернуться true, если email другого пользователя', async () => {
    expect.hasAssertions();

    const { email } = await createUserDb();

    await expect(hasUserExistsWithEmail({
      email,
      _id: userNot._id,
    }))
      .resolves
      .toBeTruthy();
  });
});
