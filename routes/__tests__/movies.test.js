const { MovieExists } = require('../../errors/messages-err');
const {
  movieData,
  movieInvalid,
  movieOther,
  movieNot,
  imageLink,
} = require('../../tests/fixtures/movie');
const {
  userOther,
} = require('../../tests/fixtures/user');
const {
  agent,
  signup,
  signin,
  logout,
  getToken,
} = require('../../tests/initApi');
const { testNotFoundRequestCheck } = require('../../tests/testKits');
const { testForbiddenRequestCheck } = require('../../tests/testKits');
const { testBadRequestCheck } = require('../../tests/testKits');
const {
  OK,
  UNAUTHORIZED,
  NOT_ALLOWED,
  CREATED_SUCCESS,
  CONFLICT_ERROR,
} = require('../../units/httpCodes');

const { movieIdRand } = movieOther;
const { durationInvalid, movieIdInvalid } = movieInvalid;
const { imageShort, imageLong, imageInvalid } = imageLink;

const {
  emailRand,
  passwordRand,
  nameRand,
} = userOther;

const createMovie = (data) => agent
  .post('/movies')
  .send(data);

describe('Тестируем проверку на доступ, что пользователь не авторизован', () => {
  it('GET "/movies" должен возвращать корректный статус', () => agent
    .get('/movies')
    .then(({ status }) => {
      expect(status).toBe(UNAUTHORIZED);
    }));

  it('POST "/movies" должен возвращать корректный статус', async () => agent
    .post('/movies')
    .set('Cookie', await getToken())
    .then(({ status }) => {
      expect(status).toBe(UNAUTHORIZED);
    }));
});

describe('Тестируем работу api с данными фильма', () => {
  let emailStart;
  let passwordStart;
  let user;

  beforeEach(async () => {
    emailStart = emailRand();
    passwordStart = passwordRand();

    user = await signup({
      email: emailStart,
      password: passwordStart,
      name: nameRand(),
    });

    await signin({
      email: emailStart,
      password: passwordStart,
    });
  });

  it('OPTIONS "/movies" должен возвращать разрешенные методы и корректный статус', async () => agent
    .options('/movies')
    .then(({ status, headers }) => {
      expect(status).toBe(OK);
      expect(headers['access-control-allow-methods']).toBe('GET,POST,OPTIONS');
    }));

  it('PUT "/users/me" должен возвращать корректный статус ошибки "Метод не разрешен"', async () => agent
    .put('/movies')
    .then(({ status }) => {
      expect(status).toBe(NOT_ALLOWED);
    }));

  describe('Тестируем получение данных фильма', () => {
    it('GET "/movies" должен возвращать корректные данные пользователя и корректный статус', async () => {
      const { body: newMovieOne } = await createMovie(
        { ...movieData, movieId: movieIdRand() },
      );
      const { body: newMovieTwo } = await createMovie(
        { ...movieData, movieId: movieIdRand() },
      );

      return agent
        .get('/movies')
        .then(({ status, headers, body }) => {
          expect(status).toBe(OK);
          expect(headers['content-type']).toMatch('application/json');
          expect(body).toMatchObject([
            { ...newMovieOne, owner: user._id },
            { ...newMovieTwo, owner: user._id },
          ]);
        });
    });
  });

  describe('Тестируем добавление фильма', () => {
    it('PATCH "/users/me" (данные верны) должен возвращать корректные данные в json-формате и корректный статус', () => {
      const newMovie = { ...movieData, movieId: movieIdRand() };

      return createMovie(newMovie)
        .then(({ status, headers, body }) => {
          expect(status).toBe(CREATED_SUCCESS);
          expect(headers['content-type']).toMatch('application/json');
          expect(body).toMatchObject(
            { ...newMovie, owner: user._id },
          );
        });
    });

    it('Фильм с данным movieId уже существует', async () => {
      const newMovieData = { ...movieData, movieId: movieIdRand() };

      await createMovie(newMovieData);

      return createMovie(newMovieData)
        .then(({ status, headers, body }) => {
          expect(status).toBe(CONFLICT_ERROR);
          expect(headers['content-type']).toMatch('application/json');
          expect(body).toMatchObject({
            message: MovieExists,
          });
        });
    });

    it('Не заполнено nameRU', async () => {
      expect.hasAssertions();
      return createMovie(
        { ...movieData, nameRU: '', movieId: movieIdRand() },
      ).then(testBadRequestCheck);
    });

    it('Не корректное movieId', async () => {
      expect.hasAssertions();
      return createMovie(
        { ...movieData, movieId: movieIdInvalid },
      ).then(testBadRequestCheck);
    });

    it('Не корректное duration', async () => {
      expect.hasAssertions();
      return createMovie(
        { ...movieData, duration: durationInvalid },
      ).then(testBadRequestCheck);
    });

    describe('Тестируем image', () => {
      it('Слишком короткая длина', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageShort },
        ).then(testBadRequestCheck);
      });

      it('Слишком длинная длина', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageLong },
        ).then(testBadRequestCheck);
      });

      it('Не корректной формат изображений', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageInvalid },
        ).then(testBadRequestCheck);
      });
    });

    describe('Тестируем trailer', () => {
      it('Слишком короткая длина', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageShort },
        ).then(testBadRequestCheck);
      });

      it('Слишком длинная длина', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageLong },
        ).then(testBadRequestCheck);
      });

      it('Не корректной формат изображений', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageInvalid },
        ).then(testBadRequestCheck);
      });
    });

    describe('Тестируем thumbnail', () => {
      it('Слишком короткая длина', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageShort },
        ).then(testBadRequestCheck);
      });

      it('Слишком длинная длина', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageLong },
        ).then(testBadRequestCheck);
      });

      it('Не корректной формат изображений', async () => {
        expect.hasAssertions();
        return createMovie(
          { ...movieData, image: imageInvalid },
        ).then(testBadRequestCheck);
      });
    });

    describe('Тестируем удаление фильма', () => {
      it('DELETE "/users/me" (данные верны) должен возвращать корректные данные в json-формате и корректный статус', async () => {
        const { body: { _id } } = await createMovie(
          { ...movieData, movieId: movieIdRand() },
        );

        return agent
          .delete(`/movies/${_id}`)
          .then(({ status, headers, body }) => {
            expect(status).toBe(OK);
            expect(headers['content-type']).toMatch('application/json');
            expect(body).toMatchObject({
              _id,
            });
          });
      });

      it('DELETE "/users/me" (не существующий id)', async () => {
        expect.hasAssertions();

        await createMovie({ ...movieData, movieId: movieIdRand() });

        return agent
          .delete(`/movies/${movieNot._id}`)
          .then(testNotFoundRequestCheck);
      });

      it('DELETE "/users/me" (фильм другого пользователя)', async () => {
        expect.hasAssertions();

        const { body: { _id } } = await createMovie(
          { ...movieData, movieId: movieIdRand() },
        );

        await logout();

        const emailNew = emailRand();
        const passwordNew = passwordRand();

        await signup({
          email: emailNew,
          password: passwordNew,
          name: nameRand(),
        });

        await signin({
          email: emailNew,
          password: passwordNew,
        });

        return agent
          .delete(`/movies/${_id}`)
          .then(testForbiddenRequestCheck);
      });
    });
  });
});
