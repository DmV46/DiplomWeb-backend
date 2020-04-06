const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/index');
const { DATABASE_URL, PORT } = require('./configuration/settings');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser()); // подписывать куки

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

// кастомный централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT);
