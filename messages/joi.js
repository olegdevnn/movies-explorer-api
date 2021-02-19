const joiMessages = {
  'string.base': 'У поля {#label} должен быть тип \'text\'',
  'string.empty': 'Поле {#label} не может быть пустым',
  'string.email': 'Поле {#label} имеет не верный формат',
  'string.min': 'Поле {#label} должно быть минимум {#limit} знака',
  'string.max': 'Поле {#label} должно быть максимум {#limit} знака',
  'string.invalid': 'Поле {#label} имеет не верный формат',
  'url.invalid': 'Поле {#label} не верный формат URL!',
  'password.invalid': 'Поле {#label} имеет не верный формат (должен содержать '
    + 'заглавную и сточную букву, цифру и символ)!',
  'password.notStrong': 'Пароль очень простой (должен содержать '
    + 'заглавную и сточную букву, цифру и символ)!',
  'any.required': 'Поле {#label} обязательное',
  'object.with': 'Данные поля обязательны {#peer}, {#main}',
  'any.disallow': '{#key} не разрешен',
  'number.base': '{#label} должно быть числом',
  'object.missing': 'Пропущено обязательное из полей {#peers}',
};

module.exports = joiMessages;
