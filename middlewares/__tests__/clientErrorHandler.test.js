const ServerError = require('../../errors/server-error-err');
const clientErrorHandler = require('../clientErrorHandler');

const mockedNext = jest.fn();
const mockReq = (data) => (data);
const mockRes = () => { };
const mockErr = () => { };

describe('Тестирование функции блокирования xhr', () => {
  it('Должен блокироваться', async () => {
    const mockedReq = mockReq({
      xhr: { },
    });
    const mockedRes = mockRes();
    const mockedErr = mockErr();

    await clientErrorHandler(mockedErr, mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalledWith(new ServerError());
  });

  it('XHR не определен', async () => {
    const mockedReq = mockReq({ });
    const mockedRes = mockRes();
    const mockedErr = mockErr();

    await clientErrorHandler(mockedErr, mockedReq, mockedRes, mockedNext);

    expect(mockedNext).toHaveBeenCalled();
  });
});
