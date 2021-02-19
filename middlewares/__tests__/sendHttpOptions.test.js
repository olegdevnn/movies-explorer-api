const sendHttpOptions = require('../sendHttpOptions');

const mockReq = (data) => (data);
const mockRes = () => {
  const res = {};
  res.header = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Тестируем функцию отправки заголовков (список разрешенных методов)', () => {
  it('Должен вернуться заголовок со списком разрешенных методов', async () => {
    const allowMethods = 'GET,POST,OPTIONS';

    const mockedRes = mockRes();
    const mockedReq = mockReq({
      allowMethods,
    });

    await sendHttpOptions(mockedReq, mockedRes);

    expect(mockedRes.send).toBeCalled();
    expect(mockedRes.header).toBeCalledWith(
      'Access-Control-Allow-Methods', allowMethods,
    );
  });
});
