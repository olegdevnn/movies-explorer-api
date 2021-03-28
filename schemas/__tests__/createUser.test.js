const userMessages = require('../../messages/user');
const {
  userData, userInvalid,
} = require('../../tests/fixtures/user');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const createUserSchema = require('../createUser');

const {
  email,
  name,
  password,
} = userData;

const {
  emailInvalid,
  emailShort,
  emailLong,
  nameLong,
  nameShort,
  passwordNotStrongOne,
  passwordNotStrongTwo,
  passwordNotStrongThree,
  passwordShort,
  passwordLong,
} = userInvalid;

describe('Тестируем схему проверки создания пользователя', () => {
  it('Должны возвращаться входные данные, данные верны', async () => {
    const newData = {
      email,
      password,
      name,
    };
    const { value, error } = createUserSchema.validate(newData);

    expect(error).toBeUndefined();
    expect(value).toEqual(newData);
    expect(createUserSchema.describe().keys).toMatchObject({
      email: {
        flags: {
          label: userMessages.email,
        },
      },
      password: {
        flags: {
          label: userMessages.password,
        },
      },
      name: {
        flags: {
          label: userMessages.name,
        },
      },
    });
  });

  describe('Должна быть ошибка на русском', () => {
    it('Не заполнен email', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(createUserSchema, {
        password,
        name,
      });
    });

    it('Не заполнено имя', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(createUserSchema, {
        password,
        email,
      });
    });

    it('Не заполнен пароль', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(createUserSchema, {
        email,
        name,
      });
    });

    describe('Тестируем пароль', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          email,
          password: passwordShort,
          name,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          email,
          password: passwordLong,
          name,
        });
      });

      it('Слабый пароль', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          password: passwordNotStrongOne,
          email,
          name,
        });
      });

      it('Слабый пароль (сложнее)', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          password: passwordNotStrongTwo,
          email,
          name,
        });
      });

      it('Слабый пароль (еще сложнее)', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          password: passwordNotStrongThree,
          email,
          name,
        });
      });
    });

    describe('Тестируем E-Mail', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          email: emailShort,
          password,
          name,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          email: emailLong,
          password,
          name,
        });
      });

      it('Не корректной формат', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          email: emailInvalid,
          password,
          name,
        });
      });
    });

    describe('Тестируем имя', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          email,
          password,
          name: nameShort,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(createUserSchema, {
          email,
          password,
          name: nameLong,
        });
      });
    });
  });
});
