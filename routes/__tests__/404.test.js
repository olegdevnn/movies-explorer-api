const {
  userOther,
} = require('../../tests/fixtures/user');
const {
  agent,
  signup,
  signin,
} = require('../../tests/initApi');
const {
  UNAUTHORIZED,
  ERROR_NOT_FOUND,
} = require('../../units/httpCodes');

const {
  emailRand,
  passwordRand,
  nameRand,
} = userOther;

describe('Тестируем работу api с несуществующим адресом', () => {
  it('GET "/error404" если не авторизован, должен возвращать корректный статус', () => agent
    .get('/error404')
    .then(({ status, body }) => {
      console.log(body);
      expect(status).toBe(UNAUTHORIZED);
    }));

  it('GET "/error404" должен возвращать корректный статус', async () => {
    const email = emailRand();
    const password = passwordRand();

    await signup({
      email,
      password,
      name: nameRand(),
    });

    await signin({
      email,
      password,
    });

    return agent
      .get('/error404')
      .then(({ status }) => {
        expect(status).toBe(ERROR_NOT_FOUND);
      });
  });
});
