const getJWTToken = require('../getJWTToken');

describe('Тестируем функцию создание jwt токена', () => {
  it('Должен получен токен, тип string, длина не менее 100 знаков', async () => {
    expect.assertions(3);
    const _id = '602595cbf36e40242c68fa0d';

    const getToken = () => getJWTToken(
      { _id },
      {
        expiresIn: 86400 * 7,
      },
    );

    await expect(getToken()).toBeDefined();
    await expect(getToken().length).toBeGreaterThan(100);
    await expect(typeof getToken()).toBe('string');
  });
});
