const userMessages = require('../../messages/user');
const {
  userEditData, userInvalid,
} = require('../../tests/fixtures/user');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const editUserSchema = require('../editUser');

const {
  email,
  name,
} = userEditData;

const {
  emailInvalid,
  emailShort,
  emailLong,
  nameLong,
  nameShort,
} = userInvalid;

describe('Тестируем схему проверки редактирования пользователя', () => {
  it('Должны возвращаться входные данные если заполнены email и имя, данные верны', async () => {
    const { value, error } = editUserSchema.validate(userEditData);

    expect(error).toBeUndefined();
    expect(value).toEqual(userEditData);
    expect(editUserSchema.describe().keys).toMatchObject({
      email: {
        flags: {
          label: userMessages.email,
        },
      },
      name: {
        flags: {
          label: userMessages.name,
        },
      },
    });
  });

  it('Должны возвращаться входные данные если заполнен только email', async () => {
    const newData = {
      email,
    };

    const { value, error } = editUserSchema.validate(newData);

    expect(error).toBeUndefined();
    expect(value).toEqual(newData);
    expect(editUserSchema.describe().keys).toMatchObject({
      email: {
        flags: {
          label: userMessages.email,
        },
      },
    });
  });

  it('Должны возвращаться входные данные если заполнено только имя', async () => {
    const newData = {
      name,
    };
    const { value, error } = editUserSchema.validate(newData);

    expect(error).toBeUndefined();
    expect(value).toEqual(newData);
    expect(editUserSchema.describe().keys).toMatchObject({
      name: {
        flags: {
          label: userMessages.name,
        },
      },
    });
  });

  it('Должна быть ошибка, если не заполнены email и имя', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(editUserSchema, { });
  });

  describe('Должна быть ошибка на русском', () => {
    describe('Тестируем E-Mail', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(editUserSchema, {
          email: emailShort,
          name,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(editUserSchema, {
          email: emailLong,
          name,
        });
      });

      it('Не корректной формат', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(editUserSchema, {
          email: emailInvalid,
          name,
        });
      });
    });

    describe('Тестируем имя', () => {
      it('Слишком короткая длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(editUserSchema, {
          ...userEditData,
          name: nameShort,
        });
      });

      it('Слишком длинная длина', async () => {
        expect.assertions(3);
        testSchemaErrorCheck(editUserSchema, {
          ...userEditData,
          name: nameLong,
        });
      });
    });
  });
});
