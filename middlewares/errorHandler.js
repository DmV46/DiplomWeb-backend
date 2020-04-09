const { isCelebrate } = require('celebrate');

const { SERVER_ERROR } = require('../configuration/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (isCelebrate(err)) {
    return res.status(400).send({ message: err.joi.message });
  }
  return res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
};

module.exports = { errorHandler };
