# Дипломная работа — Каталог Фильмов (Backend Api NodeJs)

### Обзор
* Описание работы
* Используемые технологии
* Тесты
* Описание Api

**Описание**

Проект каталог фильмов.

Api включает: Регистрацию, авторизацию, редактирование данных, список фильмов, добавить/удалить фильм в избранное

**Используемые технологии**

* NodeJs, Express, MongoDb, Mongoose, Joi
* Создан Api для работы с сайтом
* База данным MongoDb, Mongoose ODM
* Защита проекта CSRF, XSS, Query Limit и другие
* JWT авторизация, хранение токена в httpOnly, secure
* Celebrate / Joi валидация входных данных
* Применено async/await
  
**Тесты Jest**

* Моделей
* Контроллеров
* Функций
* Middlewares  
* Ошибки
* Api


IP сервера: [84.201.168.85](https://84.201.168.85)

**Api**

* https://api.oleg-zvonilov-diploma.students.nomoredomains.monster

**Описание Api**

Данные передается форматом в теле запроса (json формате). Либо в параметрах URI.

* POST /signup - создаёт пользователя с переданными в теле (email, password и name)
* POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT
* POST /signout - выход из системы, удаление токена
* GET /users/me - возвращает информацию о пользователе (email и name)
* PUT /users/me - обновляет информацию о пользователе (email и name)
* GET /movies - возвращает все сохранённые пользователем фильмы
* POST /movies - создаёт фильм с переданными в теле (country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail)
* DELETE /movies/movieId - удаляет сохранённый фильм

### Запуск проекта

`npm run start` — запускает сервер

`npm run dev` — запускает сервер с hot-reload (режим разработчика)

`npm run test` — запускает тесты (работает в developer и production)

`npm run test:coverage` — запускает тесты с отчетом об покрытии

**PostMan**

В файле `/units/postman-pre-request.js` скрипт для работы с csrf.
