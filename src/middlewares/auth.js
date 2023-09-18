const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    const error = new UnauthorizedErr('Необходима авторизация');
    return next(error);
  }

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
