const { celebrate, Segments } = require('celebrate');

const cookiesHandlerSchema = require('../../schemas/cookiesHandler');

const cookiesHandler = celebrate({
  [Segments.COOKIES]: cookiesHandlerSchema,
});

module.exports = cookiesHandler;
