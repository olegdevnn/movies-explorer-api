const { celebrate, Segments } = require('celebrate');

const createUserSchema = require('../../schemas/createUser');

const createUserValidator = celebrate({
  [Segments.BODY]: createUserSchema,
});

module.exports = createUserValidator;
