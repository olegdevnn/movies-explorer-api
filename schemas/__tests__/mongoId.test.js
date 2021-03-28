const { testSchemaErrorCheck } = require('../../tests/testKits');
const {
  mongoId,
  mongoIdInvalid,
} = require('../fixtures/mongoId');
const mongoIdSchema = require('../mongoId');

describe('Тестирование схемы проверки id mongoDb', () => {
  it('Должны возвращаться входные данные, данные верны', async () => {
    expect.assertions(2);
    const { value, error } = mongoIdSchema.validate(mongoId);

    expect(error).toBeUndefined();
    expect(value).toEqual(mongoId);
  });

  it('Должна быть ошибка на русском, не валидный id', async () => {
    expect.assertions(3);
    testSchemaErrorCheck(mongoIdSchema, mongoIdInvalid);
  });
});
