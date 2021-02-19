const MethodNotAllowedError = require('../../errors/method-not-allowed-err');
const methodMotAllowed = require('../methodMotAllowed');

describe('Тестируем функцию метод не разрешен (возврат ошибки)', () => {
  const mockReq = (data) => (data);

  const mockRes = () => {
    const res = {};
    res.next = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Должен вызываться next с ошибкой "Метод не разрешен"', async () => {
    expect.assertions(2);

    const mockedNext = jest.fn();
    const mockedReq = mockReq();
    const mockedRes = mockRes();

    await methodMotAllowed(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(expect.objectContaining(
      new MethodNotAllowedError(),
    ));
  });
});
