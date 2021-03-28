const { celebrate, Segments } = require('celebrate');

const loginSchema = require('../../schemas/login');

const loginValidator = celebrate({
  [Segments.BODY]: loginSchema,
});

module.exports = loginValidator;
