const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { authorization } = require('./authorization');
const { NOT_FOUND_PAGE } = require('../constants');
const NotFoundError = require('../errors/not-found-err');
const { signout } = require('../controllers/users');

routes.use('/', authorization);

routes.use(auth);
routes.use('/users', require('./users'));
routes.use('/movies', require('./movies'));

routes.post('/signout', signout);

routes.use((req, res, next) => {
  throw next(new NotFoundError(NOT_FOUND_PAGE));
});

module.exports = { routes };
