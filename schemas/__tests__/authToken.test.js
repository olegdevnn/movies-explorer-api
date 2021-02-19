const getJWTToken = require('../../helpers/getJWTToken');
const authMessages = require('../../messages/auth');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const authTokenSchema = require('../authToken');
const {
  tokenShort,
  tokenLong,
} = require('../fixtures/authToken');

describe('Тестирование схемы проверки токена авторизации', () => {
  it('Данные верны', async () => {
    const token = await getJWTToken({}, {});

    const { error, value } = authTokenSchema.validate(token);

    expect(error).toBeUndefined();
    expect(value).toBe(token);
    expect(authTokenSchema.describe().flags).toEqual({ label: authMessages.token });
  });

  it('Слишком короткая длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(authTokenSchema, tokenShort);
  });

  it('Слишком длинная длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(authTokenSchema, tokenLong);
  });
});
