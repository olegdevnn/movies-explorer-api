const {
  userLoginData,
} = require('../../tests/fixtures/user');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const loginSchema = require('../login');

const {
  email,
  password,
} = userLoginData;

describe('Тестирование схемы проверки авторизации', () => {
  it('Должны возвращаться входные данные, данные верны', async () => {
    const { value, error } = loginSchema.validate(userLoginData);

    expect(error).toBeUndefined();
    expect(value).toEqual(userLoginData);
  });

  describe('Должна быть ошибка на русском', () => {
    it('Не заполнен пароль', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(loginSchema, {
        email,
      });
    });

    it('Не заполнен email', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(loginSchema, {
        password,
      });
    });

    it('Не заполнен email и пароль', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(loginSchema, { });
    });
  });
});
