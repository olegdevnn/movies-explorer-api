const {
  imageValid,
  imageInvalid,
  imageShort,
  imageLong,
} = require('../../tests/fixtures/imageLink');
const { testSchemaErrorCheck } = require('../../tests/testKits');
const imageLinkSchema = require('../imageLink');

describe('Тестирование схемы проверки ссылки', () => {
  it('Должны возвращаться входные данные, данные верны', async () => {
    const { value, error } = imageLinkSchema.validate(imageValid);

    expect(error).toBeUndefined();
    expect(value).toEqual(imageValid);
  });

  describe('Должна быть ошибка на русском', () => {
    it('Не корректное формат', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(imageLinkSchema, imageInvalid);
    });

    it('Слишком короткая длина', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(imageLinkSchema, imageShort);
    });

    it('Слишком длинная длина', async () => {
      expect.assertions(3);
      testSchemaErrorCheck(imageLinkSchema, imageLong);
    });
  });
});
