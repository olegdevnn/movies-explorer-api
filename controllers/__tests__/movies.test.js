require('../../tests/initDatabase').initDatabase();

const ForbiddenError = require('../../errors/forbidden-err');
const MovieExistsError = require('../../errors/movie-exists-err');
const NotFoundMovieError = require('../../errors/movie-not-found-err');
const {
  movieData,
  movieOther,
  movieNot,
} = require('../../tests/fixtures/movie');
const {
  userNot,
} = require('../../tests/fixtures/user');
const { createUserDb, createMovieDb } = require('../../tests/initDatabase');
const { CREATED_SUCCESS } = require('../../units/httpCodes');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../movies');

const {
  movieIdRand,
} = movieOther;

const mockedNext = jest.fn();
const mockReq = (data) => (data);

let user;
let movie;
let newMovieData;
beforeEach(async () => {
  user = await createUserDb();
  newMovieData = {
    ...movieData,
    owner: user._id,
    movieId: movieIdRand(),
  };

  movie = await createMovieDb(newMovieData);
});

describe('Тестируем функцию получения массива фильмов пользователя', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должен вернуться список фильмов', async () => {
    expect.assertions(2);
    const mockedReq = mockReq({
      user: {
        _id: user._id,
      },
    });
    const mockedRes = mockRes();

    await getMovies(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.send).toHaveBeenCalledWith([
      expect.objectContaining(newMovieData),
    ]);
  });
});

describe('Тестируем функцию добавления фильма', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должен добавиться фильм', async () => {
    const newMovie = { ...movieData, movieId: movieIdRand() };
    const mockedReq = mockReq({
      user: {
        _id: user._id,
      },
      body: newMovie,
    });
    const mockedRes = mockRes();

    await createMovie(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.status).toHaveBeenCalledWith(CREATED_SUCCESS);
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining(
      { ...newMovie, owner: user._id },
    ));
  });

  test('Должна быть ошибка, фильм с данным movieId уже '
    + 'существует', async () => {
    expect.assertions(2);

    const mockedReq = mockReq({
      user: {
        _id: user._id,
      },
      body: movie,
    });
    const mockedRes = mockRes();
    await createMovie(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new MovieExistsError());
  });
});

describe('Тестируем функцию удаления фильма', () => {
  const mockRes = () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test('Должен удалиться фильм', async () => {
    const mockedReq = mockReq({
      user: {
        _id: user._id,
      },
      params: {
        movieId: movie._id,
      },
    });
    const mockedRes = mockRes();

    await deleteMovie(mockedReq, mockedRes, mockedNext);

    expect(mockedNext).not.toHaveBeenCalled();
    expect(mockedRes.send).toHaveBeenCalledWith(expect.objectContaining({
      _id: movie._id,
    }));
  });

  test('Должна быть ошибка, фильма с данным id не существует', async () => {
    const mockedReq = mockReq({
      user: {
        _id: user._id,
      },
      params: {
        movieId: movieNot._id,
      },
    });
    const mockedRes = mockRes();

    await deleteMovie(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new NotFoundMovieError());
  });

  test('Должен быть доступ закрыт (удаление чужого фильма)', async () => {
    const mockedReq = mockReq({
      user: {
        _id: userNot._id,
      },
      params: {
        movieId: movie._id,
      },
    });
    const mockedRes = mockRes();

    await deleteMovie(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.send).not.toHaveBeenCalled();
    expect(mockedNext).toHaveBeenCalledWith(new ForbiddenError());
  });
});
