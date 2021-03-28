// TODO create test verify token
const { NO_CONTENT } = require('../../units/httpCodes');
const csrfValidator = require('../csrfValidator');

describe('Тестируем csrf валидацию', () => {
  const mockReq = (data) => (data);

  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.getHeader = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.csurf = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Должен быть ответ с токеном в cookie', async () => {
    const mockedNext = jest.fn();
    const mockedReq = mockReq({
      method: 'GET',
      url: '/getToken',
      cookies: {
        csrfToken: 'testToken',
      },
    });
    const mockedRes = mockRes();

    await csrfValidator(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.cookie).toHaveBeenCalledWith(
      'csrfToken',
      expect.any(String),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    );
    expect(mockedRes.status).toHaveBeenCalledWith(NO_CONTENT);
    expect(mockedRes.send).toHaveBeenCalledWith();
  });
});
