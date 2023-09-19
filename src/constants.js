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

module.exports = {
  REG_EXP_URL,
  DEFAULT_ALLOWED_METHODS,
  ALLOWED_CORS,
  LIMITER_AUTH_MESSAGE,
  LIMITER_MESSAGE,
  NOT_FOUND_PAGE,
};
