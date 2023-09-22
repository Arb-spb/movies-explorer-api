const REG_EXP_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const ALLOWED_CORS = [
  'http://movies.best.nomoredomainsrocks.ru',
  'https://movies.best.nomoredomainsrocks.ru',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const LIMITER_AUTH_MESSAGE = 'Упсс... похоже вы привысели лимит по запросам, повторите попытку через час 🫥';
const LIMITER_MESSAGE = 'Упсс... похоже вы привысели лимит по запросам, повторите попытку через 15 минут 🫥';
const NOT_FOUND_PAGE = 'Страница по указанному маршруту не найдена';

const FORBIDDEN_ERROR_TEXT = 'Нет прав, нельзя удалять фильмы других пользователей';
const MOVIE_ID_NOT_FOUND_ERROR_TEXT = 'Запрашиваемый фильм не найден';
const USER_ID_NOT_FOUND_TEXT = 'Нет пользователя с таким id';
const USER_NOT_FOUND_TEXT = 'Пользователь не найден';
const BAD_REQUEST = 'Переданы некорректные данные';
const BAD_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const MONGO_URL = 'mongodb://localhost:27017/moviesdb';
const DEV_SECRET_KEY = 'some-secret-key';

module.exports = {
  REG_EXP_URL,
  DEFAULT_ALLOWED_METHODS,
  ALLOWED_CORS,
  LIMITER_AUTH_MESSAGE,
  LIMITER_MESSAGE,
  NOT_FOUND_PAGE,
  FORBIDDEN_ERROR_TEXT,
  MOVIE_ID_NOT_FOUND_ERROR_TEXT,
  USER_ID_NOT_FOUND_TEXT,
  MONGO_URL,
  BAD_REQUEST,
  VALIDATION_ERROR,
  USER_NOT_FOUND_TEXT,
  CAST_ERROR,
  BAD_EMAIL_OR_PASSWORD,
  DEV_SECRET_KEY,
};
