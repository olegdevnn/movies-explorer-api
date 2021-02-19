const userMessages = require('../../messages/user');
const {
  userData, userInvalid,
} = require('../../tests/fixtures/user');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const {
  emailSchema,
  passwordSchema,
  nameSchema,
} = require('../user');

const {
  email,
  name,
} = userData;

const {
  emailShort,
  emailLong,
  nameShort,
  nameLong,
  password,
  passwordShort,
  passwordLong,
} = userInvalid;

describe('Тестирование схемы проверки email', () => {
  it('Должна вернуться строка с входным значением', async () => {
    expect.assertions(3);

    const { value, error } = emailSchema.validate(email);

    expect(value).toEqual(email);
    expect(error).toBeUndefined();
    expect(emailSchema.describe().flags).toEqual({ label: userMessages.email });
  });

  it('Слишком короткая длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(emailSchema, emailShort);
  });

  it('Слишком длинная длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(emailSchema, emailLong);
  });
});

describe('Тестирование схемы проверки пароля', () => {
  it('Должен вернуться объект с входным значением', async () => {
    expect.assertions(3);
    const { value, error } = passwordSchema.validate(password);

    expect(error).toBeUndefined();
    expect(value).toEqual(password);
    expect(passwordSchema.describe().flags).toEqual({ label: userMessages.password });
  });

  it('Слишком короткая длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(passwordSchema, passwordShort);
  });

  it('Слишком длинная длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(passwordSchema, passwordLong);
  });
});

describe('Тестирование схемы проверки имени', () => {
  it('Должен вернуться объект с входным значением', async () => {
    expect.assertions(3);
    const { value, error } = nameSchema.validate(name);

    expect(error).toBeUndefined();
    expect(value).toEqual(name);
    expect(nameSchema.describe().flags).toEqual({ label: userMessages.name });
  });

  it('Слишком короткая длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(nameSchema, nameShort);
  });

  it('Слишком длинная длина', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(nameSchema, nameLong);
  });
});
