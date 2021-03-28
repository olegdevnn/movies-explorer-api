const { TooManyRequest } = require('../messages-err');
const TooManyRequestsError = require('../too-many-requests-err');

describe('Тестируем ошибку 429', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new TooManyRequestsError().statusCode).toBe(429);
    expect(new TooManyRequestsError().message).toBe(TooManyRequest);
  });
});
