require('../../tests/initDatabase').initDatabase();
const UnauthorizedError = require('../../errors/unauthorized-err');
const getJWTToken = require('../../helpers/getJWTToken');
const {
  userNot,
} = require('../../tests/fixtures/user');
const { createUserDb } = require('../../tests/initDatabase');
const auth = require('../auth');
const {
  jwtInvalid,
} = require('../fixtures/auth');

const mockedNext = jest.fn();
const mockReq = (data) => (data);

describe('Тестируем функцию авторизации, проверки токена', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Токен передан и проверен', async () => {
    const { _id } = await createUserDb();

    const jwt = await getJWTToken(
      { _id },
      {
        expiresIn: 86400 * 7,
      },
    );

    const mockedReq = mockReq({
      cookies: {
        jwt,
      },
    });
    const mockedRes = mockRes();

    await auth(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalledWith(new UnauthorizedError());
    expect(mockedReq.user).toHaveProperty('_id', _id.toString());
  });

  it('Токен не передан', async () => {
    const mockedReq = mockReq({
      cookies: { },
    });
    const mockedRes = mockRes();

    await auth(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(new UnauthorizedError());
  });

  it('Токен не валидный', async () => {
    const mockedReq = mockReq({
      cookies: {
        jwt: jwtInvalid,
      },
    });
    const mockedRes = mockRes();

    await auth(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(new UnauthorizedError());
  });

  it('Токен передан но пользователь не найден', async () => {
    const jwt = await getJWTToken(
      { _id: userNot._id },
      {
        expiresIn: 86400 * 7,
      },
    );

    const mockedReq = mockReq({
      cookies: {
        jwt,
      },
    });
    const mockedRes = mockRes();

    await auth(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(new UnauthorizedError());
  });
});
