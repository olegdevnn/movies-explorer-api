// TODO create test request
const { NotFound } = require('../../errors/messages-err');
const { errorLogger } = require('../logger');

describe('Тестирование пакетов логирования', () => {
  const mockReq = (data) => (data);
  const mockErr = (data) => (data);

  const mockRes = () => {
    const res = {};
    res.end = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Должна быть возвращено сообщение входящий ошибки', async () => {
    const mockedNext = jest.fn();
    const mockedReq = mockReq({
      method: 'POST',
      url: '/signin',
    });
    const mockedRes = mockRes();
    const mockedErr = mockErr({
      message: NotFound,
    });

    await errorLogger(mockedErr, mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith({
      message: NotFound,
    });
  });
});
