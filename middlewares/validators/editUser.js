const { celebrate, Segments } = require('celebrate');

const editUserSchema = require('../../schemas/editUser');

const editUserValidator = celebrate({
  [Segments.BODY]: editUserSchema,
});

module.exports = editUserValidator;
