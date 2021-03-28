const getJWTToken = require('../getJWTToken');
const verifyJWTToken = require('../verifyJWTToken');

describe('Тестируем созданный jwt токена', () => {
  it('Должен быть создан токен с данными и проверен на валидность данных', async () => {
    expect.assertions(3);
    const _id = '602595cbf36e40242c68fa0d';

    const token = await getJWTToken({ _id }, { expiresIn: 86400 * 7 });

    await expect(token).toBeDefined();
    await expect(token).toEqual(expect.any(String));
    await expect(verifyJWTToken(token)).toHaveProperty('_id', _id);
  });
});
