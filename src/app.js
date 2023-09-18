const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const { signin, createUser, signout } = require('./controllers/users');

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  },
}), createUser);
app.post('/signin', celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), signin);
app.post('/signout', signout);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(() => {
  throw new NotFoundError('Не известный роут');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
