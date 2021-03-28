const NotFoundError = require('../../errors/not-found-err');
const notFoundError = require('../notFoundError');

describe('Тестируем функцию не найдено (возврат ошибки)', () => {
  const mockReq = (data) => (data);

  const mockRes = () => {
    const res = {};
    res.next = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Должен вызываться next с ошибкой "Не найдено"', async () => {
    expect.assertions(2);

    const mockedNext = jest.fn();
    const mockedReq = mockReq();
    const mockedRes = mockRes();

    await notFoundError(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new NotFoundError());
  });
});
