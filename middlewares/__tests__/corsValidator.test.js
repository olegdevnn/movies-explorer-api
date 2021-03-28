const MethodNotAllowedError = require('../../errors/method-not-allowed-err');
const corsValidator = require('../corsValidator');

describe('Тестирование cors функции', () => {
  const mockReq = (data) => (data);

  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Должен вызваться cors с ошибкой', async () => {
    const mockedNext = jest.fn();
    const mockedReq = mockReq({
      headers: { },
    });
    const mockedRes = mockRes();

    await corsValidator(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(new MethodNotAllowedError());
  });
});
