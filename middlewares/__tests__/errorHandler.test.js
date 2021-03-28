const { CelebrateError } = require('celebrate');

const { ServerError, NotFound } = require('../../errors/messages-err');
const { ERROR_SERVER_ERROR } = require('../../units/httpCodes');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND } = require('../../units/httpCodes');
const errorHandler = require('../errorHandler');

const mockedNext = jest.fn();
const mockReq = (data) => (data);
const mockErr = (data) => (data);

describe('Тестируем общий обработчик ошибок', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Должна вернуться входная ошибка и вызвана функция next', async () => {
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    const mockedErr = mockErr({
      statusCode: ERROR_NOT_FOUND,
      message: NotFound,
    });

    await errorHandler(mockedErr, mockedReq, mockedRes, mockedNext);

    expect(mockedRes.status).toHaveBeenCalledWith(ERROR_NOT_FOUND);
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining({
      message: NotFound,
    }));
    expect(mockedNext).toBeCalled();
  });

  it('Должна вернуться ошибка по умолчанию и вызвана функция next', async () => {
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    const mockedErr = mockErr({
    });

    await errorHandler(mockedErr, mockedReq, mockedRes, mockedNext);

    expect(mockedRes.status).toHaveBeenCalledWith(ERROR_SERVER_ERROR);
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining({
      message: ServerError,
    }));
    expect(mockedNext).toBeCalled();
  });

  it('Должна вернуться ошибка Celebrate (не корректный запрос)', async () => {
    const mockedReq = mockReq();
    const mockedRes = mockRes();
    const mockedErr = mockErr(new CelebrateError(NotFound, {
      celebrated: true,
    }));

    await errorHandler(mockedErr, mockedReq, mockedRes, mockedNext);

    expect(mockedRes.status).toHaveBeenCalledWith(ERROR_BAD_REQUEST);
    expect(mockedNext).toBeCalled();
  });
});
