const {
  authOk,
  authInvalidData,
  logoutOk,
} = require('../../messages/user');
const {
  userData,
  userOther,
  userInvalid,
} = require('../../tests/fixtures/user');
const {
  agent,
  getToken,
  signup,
  signin,
} = require('../../tests/initApi');
const {
  OK,
  UNAUTHORIZED,
  NOT_ALLOWED,
  ERROR_BAD_REQUEST,
} = require('../../units/httpCodes');

const { emailInvalid } = userInvalid;
const { emailRand, passwordRand } = userOther;

describe('Тестируем api регистрации', () => {
  it('POST "/signup" должен  данные пользователя в json-формате и корректный статус', async () => {
    const newEmail = emailRand();

    return agent
      .post('/signup')
      .set('Cookie', await getToken())
      .send({
        ...userData,
        email: newEmail,
      })
      .then(({ status, headers, body }) => {
        expect(status).toBe(201);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toMatchObject({
          email: newEmail,
          name: userData.name,
        });
        expect(body).not.toMatchObject({
          password: expect.any(String),
        });
      });
  });

  it('POST "/signup" должен возвращать статус ошибки при невалидном email', async () => agent
    .post('/signup')
    .set('Cookie', await getToken())
    .send({
      ...userData,
      email: emailInvalid,
    })
    .then(({ status, headers, body }) => {
      expect(status).toBe(ERROR_BAD_REQUEST);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toMatchObject({
        message: expect.any(String),
      });
    }));

  it('POST "/signup" должен возвращать статус ошибки при невалидном пароле', async () => agent
    .post('/signup')
    .set('Cookie', await getToken())
    .send({
      ...userData,
      email: emailRand(),
      password: userInvalid.password,
    })
    .then(({ status, headers, body }) => {
      expect(status).toBe(ERROR_BAD_REQUEST);
      expect(headers['content-type']).toMatch('application/json');
      expect(body).toMatchObject({
        message: expect.any(String),
      });
    }));

  it('OPTIONS "/signup" должен возвращать код и OPTIONS с разрешенными методами', async () => agent
    .options('/signup')
    .then(({ status, headers }) => {
      expect(status).toBe(OK);
      expect(headers['access-control-allow-methods']).toBe('POST,OPTIONS');
    }));

  it('PUT "/signup" должен возвращать корректный статус ошибки "Метод не разрешен"', async () => agent
    .put('/signup')
    .set('Cookie', await getToken())
    .then(({ status }) => {
      expect(status).toBe(NOT_ALLOWED);
    }));
});

describe('Тестируем api авторизации и выхода из системы', () => {
  const emailStart = emailRand();
  const passwordStart = passwordRand();

  beforeAll(async () => {
    await signup({
      ...userData,
      email: emailStart,
      password: passwordStart,
    });
  });

  describe('Api авторизации', () => {
    it('POST "/signin" должен возвращать сообщение в json-формате и корректный статус', async () => agent
      .post('/signin')
      .send({
        email: emailStart,
        password: passwordStart,
      })
      .then(({ status, headers, body }) => {
        expect(status).toBe(OK);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toMatchObject({
          message: authOk,
        });
        const jwtCookie = headers['set-cookie'].map((i) => i.split(';')[0]).join(';');
        expect(jwtCookie).toBeDefined();
      }));

    it('POST "/signin" должен возвращать статус ошибки при неправильном email', async () => agent
      .post('/signin')
      .send({
        email: userOther.emailTwo,
        password: passwordStart,
      })
      .set('Cookie', await getToken())
      .then(({ status, headers, body }) => {
        expect(status).toBe(UNAUTHORIZED);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toMatchObject({
          message: authInvalidData,
        });
      }));

    it('POST "/signin" должен возвращать статус ошибки при неправильном пароле', async () => agent
      .post('/signin')
      .send({
        email: emailStart,
        password: userOther.passwordTwo,
      })
      .set('Cookie', await getToken())
      .then(({ status, headers, body }) => {
        expect(status).toBe(UNAUTHORIZED);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toMatchObject({
          message: authInvalidData,
        });
      }));

    it('OPTIONS "/signin" должен возвращать ошибки и OPTIONS с разрешенными методами', async () => agent
      .options('/signin')
      .then(({ status, headers }) => {
        expect(status).toBe(OK);
        expect(headers['access-control-allow-methods']).toBe('POST,OPTIONS');
      }));
  });

  describe('Api выхода из системы', () => {
    it('POST "/logout" должен возвращать сообщение в json-формате и корректный статус', async () => {
      await signin({ email: emailStart, password: passwordStart });

      return agent
        .post('/logout')
        .then(({ status, headers, body }) => {
          expect(status).toBe(OK);
          expect(headers['content-type']).toMatch('application/json');
          expect(body).toMatchObject({
            message: logoutOk,
          });
          const jwtCookieClear = headers['set-cookie'].map((i) => i.split(';')[0]).join(';');
          expect(jwtCookieClear).toBe('jwt=');
        });
    });

    it('OPTIONS "/logout" должен возвращать ошибки и OPTIONS с разрешенными методами', async () => agent
      .options('/logout')
      .then(({ status, headers }) => {
        expect(status).toBe(OK);
        expect(headers['access-control-allow-methods']).toBe('POST,OPTIONS');
      }));

    it('POST "/logout" защищен авторизаций', async () => agent
      .post('/logout')
      .set('Cookie', await getToken())
      .then(({ status }) => {
        expect(status).toBe(UNAUTHORIZED);
      }));
  });
});
