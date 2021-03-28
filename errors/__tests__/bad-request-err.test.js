const BadRequestError = require('../bad-request-err');
const { BadRequest } = require('../messages-err');

describe('Тестируем ошибку 400', () => {
  it('Должен возвращать корректный статус и сообщение об ошибке', () => {
    expect.assertions(2);
    expect(new BadRequestError().statusCode).toBe(400);
    expect(new BadRequestError().message).toBe(BadRequest);
  });
});
