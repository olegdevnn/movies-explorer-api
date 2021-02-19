const { max } = require('../../config/rateLimiter');
const TooManyRequestsError = require('../../errors/too-many-requests-err');
const rateLimiter = require('../rateLimiter');

const sendQueries = ({
  mockedReq, mockedRes, mockedNext, sum,
}) => {
  const promises = [];
  let countQueries = sum;
  while (countQueries >= 0) {
    countQueries -= 1;
    promises.push(rateLimiter(mockedReq, mockedRes, mockedNext));
  }

  return promises;
};

const mockedNext = jest.fn();

describe('Тестируем функцию ограничитель запросов', () => {
  const mockReq = (data) => (data);

  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.limitHandler = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    return res;
  };

  it('Должен вернуться ответ без ошибок (запросов меньше лимита)', async () => {
    const mockedReq = mockReq({
      ip: '200.200.200.200',
    });
    const mockedRes = mockRes();

    await Promise.all(sendQueries({
      mockedReq,
      mockedRes,
      mockedNext,
      sum: max - 10,
    }));

    expect(mockedNext).not.toBeCalledWith(new TooManyRequestsError());
  });

  it('Должен вернуться ошибка (превышен лимит)', async () => {
    const mockedReq = mockReq({
      ip: '200.200.200.200',
    });
    const mockedRes = mockRes();

    await Promise.all(sendQueries({
      mockedReq,
      mockedRes,
      mockedNext,
      sum: max + 10,
    }));

    expect(mockedNext).toBeCalledWith(new TooManyRequestsError());
  });
});
