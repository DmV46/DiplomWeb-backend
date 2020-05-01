const { SERVER_ERROR } = require('../configuration/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({ message: statusCode === 500 ? SERVER_ERROR : message });
};

module.exports = { errorHandler };
