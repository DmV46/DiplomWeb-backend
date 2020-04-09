const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../configuration/settings');
const { UNAUTHORIZED } = require('../configuration/constants');


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let playload;
  try {
    playload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }
  req.user = playload;

  return next();
};
