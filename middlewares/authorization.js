const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../configuration/settings');
const { UNAUTHORIZED } = require('../configuration/constants');


module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  let playload;
  try {
    playload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }
  req.user = playload;

  return next();
};
