require('../../tests/initDatabase').initDatabase();

const { jwt: { expiresIn } } = require('../../config/auth');
const UnauthorizedError = require('../../errors/unauthorized-err');
const UserExistsError = require('../../errors/user-exists-err');
const UserNotFoundError = require('../../errors/user-not-found-err');
const {
  authOk,
  logoutOk,
} = require('../../messages/user');
const { authInvalidData } = require('../../messages/user');
const User = require('../../models/user');
const {
  userOther,
  userNot,
} = require('../../tests/fixtures/user');
const { createUserDb } = require('../../tests/initDatabase');
const {
  CREATED_SUCCESS,
} = require('../../units/httpCodes');
const {
  login,
  createUser,
  logout,
  getUser,
  editUser,
} = require('../users');

const {
  emailRand,
  passwordRand,
  nameRand,
} = userOther;

const mockedNext = jest.fn();
const mockReq = (data) => (data);

describe('Тестируем функцию получение данные пользователя', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должны быть получены данные, пароля не должно быть', async () => {
    const { _id, email, name } = await createUserDb();

    const mockedReq = mockReq({
      user: {
        _id,
      },
    });
    const mockedRes = mockRes();

    await getUser(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining({
      email,
      name,
    }));
    expect(mockedRes.send).toHaveBeenCalledWith(
      expect.not.objectContaining({
        password: expect.any(String),
      }),
    );
  });

  test('Должна быть ошибка, пользователя с данным id не существует', async () => {
    const mockedReq = mockReq({
      user: {
        _id: userNot._id,
      },
    });
    const mockedRes = mockRes();

    await getUser(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new UserNotFoundError());
  });
});

describe('Тестируем функцию редактирование данных пользователя', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должны быть изменены и возвращены данные без пароля', async () => {
    const { _id } = await createUserDb();

    const newData = {
      email: emailRand(),
      name: nameRand(),
    };

    const mockedReq = mockReq({
      user: {
        _id,
      },
      body: newData,
    });

    const mockedRes = mockRes();

    await editUser(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.send).toHaveBeenCalledWith(
      expect.objectContaining(newData),
    );
    expect(mockedRes.send).toHaveBeenCalledWith(
      expect.not.objectContaining({
        password: expect.any(String),
      }),
    );
  });

  test('Должен быть изменен email и возвращены данные без пароля', async () => {
    const { _id } = await createUserDb();

    const newEmail = emailRand();

    const mockedReq = mockReq({
      user: {
        _id,
      },
      body: {
        email: newEmail,
      },
    });

    const mockedRes = mockRes();

    await editUser(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining({
      email: newEmail,
    }));
  });

  test('Должно быть изменено имя и возвращены данные без пароля', async () => {
    const { _id } = await createUserDb();

    const newName = nameRand();

    const mockedReq = mockReq({
      user: {
        _id,
      },
      body: {
        name: newName,
      },
    });

    const mockedRes = mockRes();

    await editUser(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining({
      name: newName,
    }));
  });

  test('Должна быть ошибка, пользователя с _id не существует', async () => {
    const mockedReq = mockReq({
      user: {
        _id: userNot._id,
      },
      body: {
        email: emailRand(),
        name: nameRand(),
      },
    });

    const mockedRes = mockRes();

    await editUser(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new UserNotFoundError());
  });

  test('Должна быть ошибка, пользователь с email уже существует', async () => {
    const { _id } = await createUserDb();

    const newUser = await User.create({
      email: emailRand(),
      password: passwordRand(),
      name: nameRand(),
    });
    const { email } = newUser;

    const mockedReq = mockReq({
      user: {
        _id,
      },
      body: {
        email,
        name: '111',
      },
    });
    const mockedRes = mockRes();

    await editUser(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new UserExistsError());
  });
});

describe('Тестируем функцию создания пользователя', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должен быть создан пользователь и возвращены данные без пароля', async () => {
    const newEmail = emailRand();
    const newName = nameRand();

    const mockedReq = mockReq({
      body: {
        email: newEmail,
        name: newName,
        password: passwordRand(),
      },
    });
    const mockedRes = mockRes();

    await createUser(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.status).toHaveBeenCalledWith(CREATED_SUCCESS);
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining({
      email: newEmail,
      name: newName,
    }));
    expect(mockedRes.send).toHaveBeenCalledWith(expect.not.objectContaining({
      password: expect.any(String),
    }));
  });

  test('Должна быть ошибка, пользователь с данным email уже существует', async () => {
    const { email, name, password } = await createUserDb();

    const mockedReq = mockReq({
      body: {
        email,
        password,
        name,
      },
    });
    const mockedRes = mockRes();

    await createUser(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new UserExistsError());
  });
});

describe('Тестируем функцию авторизации', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должна быть вызвана функция установки токена в cookie и '
    + 'возвращено сообщение об успешной авторизации', async () => {
    const { email, password } = await createUserDb();

    const mockedReq = mockReq({
      body: {
        email,
        password,
      },
    });
    const mockedRes = mockRes();

    await login(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.cookie).toHaveBeenCalledWith('jwt', expect.any(String), {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      secure: process.env.NODE_ENV === 'production',
    });
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining(
      { message: authOk },
    ));
  });

  test('Должна быть ошибка авторизации, пользователь с данным email'
    + ' не существует', async () => {
    const { password } = await createUserDb();

    const mockedReq = mockReq({
      body: {
        email: emailRand(),
        password,
      },
    });
    const mockedRes = mockRes();

    await login(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedRes.cookie).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(
      new UnauthorizedError(authInvalidData),
    );
  });

  test('Должна быть ошибка авторизации, не корректный пароль', async () => {
    const { email } = await createUserDb();

    const mockedReq = mockReq({
      body: {
        email,
        password: userOther.passwordTwo,
      },
    });
    const mockedRes = mockRes();

    await login(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedRes.cookie).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(
      new UnauthorizedError(authInvalidData),
    );
  });
});

describe('Тестируем функцию выхода из системы', () => {
  const mockRes = () => {
    const res = { };
    res.send = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должна быть вызвана функцию cookie для удаления токена и '
    + 'возвращено сообщение об успехе', async () => {
    const { email, password } = await createUserDb();

    const mockedReq = mockReq({
      body: {
        email,
        password,
      },
    });
    const mockedRes = mockRes();

    await logout(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.clearCookie).toHaveBeenCalledWith('jwt');
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining(
      { message: logoutOk },
    ));
  });
});
