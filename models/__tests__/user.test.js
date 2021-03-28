require('../../tests/initDatabase').initDatabase();
const {
  authInvalidData,
} = require('../../messages/user');
const {
  userData,
  userInvalid,
  userOther,
  userNot,
} = require('../../tests/fixtures/user');
const { createUserDb } = require('../../tests/initDatabase');
const User = require('../user');

const {
  emailRand,
  passwordRand,
  nameRand,
} = userOther;

const {
  emailInvalid,
  emailShort,
  emailLong,
  nameShort,
  nameLong,
} = userInvalid;

describe('Тестируем добавление пользователя', () => {
  it('Пользователь должен добавиться', async () => {
    const newUser = await User.create({
      ...userData,
      email: emailRand(),
    });
    const { password } = newUser;

    const { any } = expect;

    expect(newUser).toBeDefined();

    expect(newUser).toMatchObject({
      email: any(String),
      password: any(String),
      name: any(String),
    });

    expect(newUser).toMatchObject(newUser);
    expect(password).toHaveLength(60);
  });

  it('Пользователь не должен быть добавлен, невалидный E-Mail', async () => {
    await expect(User.create({
      email: emailInvalid,
      password: passwordRand(),
      name: nameRand(),
    })).rejects.toThrow();
  });

  it('Пользователь не должен быть добавлен, слишком короткая длина E-Mail', async () => {
    await expect(User.create({
      email: emailShort,
      password: passwordRand(),
      name: nameRand(),
    })).rejects.toThrow();
  });

  it('Пользователь не должен быть добавлен, слишком длинная длина E-Mail', async () => {
    await expect(User.create({
      email: emailLong,
      password: passwordRand(),
      name: nameRand(),
    })).rejects.toThrow();
  });

  it('Пользователь не должен быть добавлен, слишком короткая длина имени', async () => {
    await expect(User.create({
      email: emailRand(),
      password: passwordRand(),
      name: nameShort,
    })).rejects.toThrow();
  });

  it('Пользователь не должен быть добавлен, слишком длинная длина имени', async () => {
    await expect(User.create({
      email: emailRand(),
      password: passwordRand(),
      name: nameLong,
    })).rejects.toThrow();
  });
});

describe('Тестируем обновление пользователя', () => {
  it('Должны обновиться данные, пароля не должен возвращаться', async () => {
    const newData = {
      email: emailRand(),
      password: passwordRand(),
      name: nameRand(),
    };

    const user = await createUserDb();

    const getUser = await User.findById(user._id).exec();
    Object.assign(getUser, newData);
    await getUser.save();

    expect(await User.findById(getUser._id)).toMatchObject({
      email: newData.email,
      password: undefined,
      name: newData.name,
    });
  });

  it('Пароль должен обновиться, в зашифрованном виде', async () => {
    const { _id } = await createUserDb();

    const getUser = await User.findById(_id)
      .select('+password')
      .exec();
    expect(getUser.password).toBeDefined();

    const oldPassword = getUser.password;

    Object.assign(getUser, { password: passwordRand() });
    await getUser.save();

    const newUser = await User.findById(getUser._id)
      .select('+password')
      .exec();

    expect(newUser.password).toBeDefined();
    expect(newUser).not.toHaveProperty('password', oldPassword);
    expect(newUser.password).toHaveLength(60);
  });
});

describe('Тестируем получение данных пользователя', () => {
  it('Должны быть получены данные, пароля не должно быть', async () => {
    const { _id } = await createUserDb();
    return User.findById(_id)
      .then((doc) => {
        expect(doc).toBeDefined();
        expect(doc).toMatchObject({
          email: expect.any(String),
          name: expect.any(String),
        });
        expect(doc).toHaveProperty('password', undefined);
      });
  });

  it('Должна быть ошибка, неверный id пользователя', async () => {
    await expect(User.findById(userNot._id)).resolves.toBeNull();
  });
});

describe('Тестируем функцию авторизации', () => {
  it('Должна быть успешна', async () => {
    const { email, password } = await createUserDb();

    await expect(User.findUserByCredentials({
      email,
      password,
    })).resolves.toHaveProperty('_id');
  });

  it('Должна быть отклонена, не верный email', async () => {
    const { password } = await createUserDb();

    await expect(User.findUserByCredentials({
      email: userOther.emailTwo,
      password,
    })).rejects.toThrow(authInvalidData);
  });

  it('Должна быть отклонена, не верный пароль', async () => {
    const { email } = await createUserDb();

    await expect(User.findUserByCredentials({
      email,
      password: userOther.passwordTwo,
    })).rejects.toThrow(authInvalidData);
  });
});
