const { UserExists } = require('../../errors/messages-err');
const {
  userOther,
  userInvalid,
} = require('../../tests/fixtures/user');
const {
  agent,
  signup,
  signin,
} = require('../../tests/initApi');
const { testChangeUserRequestCheck } = require('../../tests/testKits');
const {
  testBadRequestCheck,
} = require('../../tests/testKits');
const {
  OK,
  UNAUTHORIZED,
  NOT_ALLOWED,
  CONFLICT_ERROR,
} = require('../../units/httpCodes');

const {
  emailRand,
  passwordRand,
  nameRand,
} = userOther;

const emailStart = emailRand();
const passwordStart = passwordRand();
const nameStart = nameRand();

beforeAll(async () => {
  await signup({
    email: emailStart,
    password: passwordStart,
    name: nameStart,
  });
});

describe('Тестируем проверку на доступ, что пользователь авторизован', () => {
  it('GET "/users/me" должен возвращать корректный статус', () => agent
    .get('/users/me')
    .then(({ status }) => {
      expect(status).toBe(UNAUTHORIZED);
    }));

  it('PATCH "/users/me" должен возвращать корректный статус', () => agent
    .patch('/users/me')
    .then(({ status }) => {
      expect(status).toBe(UNAUTHORIZED);
    }));
});

describe('Тестируем работу api с данными пользователя', () => {
  beforeEach(async () => {
    await signin({
      email: emailStart,
      password: passwordStart,
    });
  });

  it('OPTIONS "/users/me" должен возвращать разрешенные методы и корректный статус', async () => agent
    .options('/users/me')
    .then(({ status, headers }) => {
      expect(status).toBe(OK);
      expect(headers['access-control-allow-methods']).toBe('GET,PATCH,OPTIONS');
    }));

  it('PUT "/users/me" должен возвращать корректный статус ошибки "Метод не разрешен"', async () => agent
    .put('/users/me')
    .then(({ status }) => {
      expect(status).toBe(NOT_ALLOWED);
    }));

  describe('Тестируем получение данных', () => {
    it('GET "/users/me" должен возвращать корректные данные в json-формате и корректный статус', () => agent
      .get('/users/me')
      .then(({ status, headers, body }) => {
        expect(status).toBe(OK);
        expect(headers['content-type']).toMatch('application/json');
        expect(body).toMatchObject({
          email: emailStart,
          name: nameStart,
        });
        expect(body).not.toMatchObject({
          password: expect.any(String),
        });
      }));
  });

  describe('Тестируем редактирование данных', () => {
    it('PATCH "/users/me" (данные верны) должен возвращать корректные данные в json-формате и корректный статус', () => {
      expect.assertions(4);
      const newData = {
        email: emailRand(),
        name: nameRand(),
      };

      return agent
        .patch('/users/me')
        .send(newData)
        .then((request) => testChangeUserRequestCheck(request, newData));
    });

    it('PATCH "/users/me" (можно изменить email, имя не меняется)', () => {
      expect.assertions(4);
      const newData = { email: emailRand() };

      return agent
        .patch('/users/me')
        .send(newData)
        .then((request) => testChangeUserRequestCheck(request, newData));
    });

    it('PATCH "/users/me" (смена на email, которое уже есть в системе)', async () => {
      const newUser = await signup({
        email: emailRand(),
        password: passwordRand(),
        name: nameRand(),
      });

      return agent
        .patch('/users/me')
        .send({
          email: newUser.email,
        })
        .then(({ status, headers, body }) => {
          expect(status).toBe(CONFLICT_ERROR);
          expect(headers['content-type']).toMatch('application/json');
          expect(body).toMatchObject({
            message: UserExists,
          });
        });
    });

    it('PATCH "/users/me" (некорректный email)', async () => {
      expect.assertions(4);
      return agent
        .patch('/users/me')
        .send({
          email: userInvalid.emailInvalid,
        })
        .then(testBadRequestCheck);
    });

    it('PATCH "/users/me" (можно изменить имя, email не меняется)', () => {
      expect.assertions(4);
      return agent
        .patch('/users/me')
        .send({
          name: userOther.nameTwo,
        })
        .then(({ status, headers, body }) => {
          expect(status).toBe(OK);
          expect(headers['content-type']).toMatch('application/json');
          expect(body).toMatchObject({
            name: userOther.nameTwo,
          });
          expect(body).not.toMatchObject({
            password: expect.any(String),
          });
        });
    });
  });
});
