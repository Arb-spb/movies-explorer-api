const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const { routes } = require('./routes/index');
const { MONGO_URL } = require('./constants');

require('dotenv').config();

const { PORT = 3000, DATA_BASE, NODE_ENV } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const app = express();

app.use(cors);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
