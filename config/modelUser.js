// Параметры для модели пользователя
const modelUser = {
  email: {
    minLength: 8,
    maxLength: 30,
  },
  password: {
    minLength: 8,
    maxLength: 30,
  },
  name: {
    minLength: 2,
    maxLength: 30,
  },
};

module.exports = modelUser;
