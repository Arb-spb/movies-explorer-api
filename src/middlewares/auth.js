const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new UnauthorizedErr('Необходима авторизация');
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  const { NODE_ENV, JWT_SECRET } = process.env;
  const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    const error = new UnauthorizedErr('Необходима авторизация');
    return next(error);
  }

  req.user = payload;
  return next();
};
